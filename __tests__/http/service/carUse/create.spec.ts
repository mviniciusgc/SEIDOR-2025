import 'reflect-metadata';
import { CreateCarUserServer } from '../../../../src/http/service/carUse/create';
import { ICarUseRepository } from '../../../../src/http/Repository/interface/ICarUseRepository';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import { IDriveRepository } from '../../../../src/http/Repository/interface/IDriveRepository';
import { ICarUser } from '../../../../src/http/Repository/interfaceDTO/carUser';
import CarUse from '../../../../src/db/entity/carUse';
import Drive from '../../../../src/db/entity/drive';
import Car from '../../../../src/db/entity/car';

describe('CreateCarUserServer', () => {
    let createCarUserServer: CreateCarUserServer;
    let carUseRepositoryMock: jest.Mocked<ICarUseRepository>;
    let carRepositoryMock: jest.Mocked<ICarRepository>;
    let driveRepositoryMock: jest.Mocked<IDriveRepository>;

    beforeEach(() => {
        carUseRepositoryMock = {
            findOne: jest.fn(),
            create: jest.fn()
        } as unknown as jest.Mocked<ICarUseRepository>;

        carRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<ICarRepository>;

        driveRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<IDriveRepository>;

        createCarUserServer = new CreateCarUserServer(
            carUseRepositoryMock,
            carRepositoryMock,
            driveRepositoryMock
        );
    });

    it('deve retornar erro se o motorista não for encontrado', async () => {
        const data: ICarUser = { driveId: 1, carId: 1 } as ICarUser;

        driveRepositoryMock.findOne.mockResolvedValue(null);

        const result = await createCarUserServer.execute(data);

        expect(result).toEqual(new Error('motorista não encontrado'));
    });

    it('deve retornar erro se o motorista já utiliza outro veículo', async () => {
        const data: ICarUser = { driveId: 1, carId: 1 } as ICarUser;
        const drive: Drive = { id: 1 } as Drive;

        driveRepositoryMock.findOne.mockResolvedValue(drive);
        carUseRepositoryMock.findOne.mockResolvedValueOnce({ id: 1 } as CarUse);

        const result = await createCarUserServer.execute(data);

        expect(result).toEqual(new Error('motorista já utiliza outro veiculo'));
    });

    it('deve retornar erro se o carro não for encontrado', async () => {
        const data: ICarUser = { driveId: 1, carId: 1 } as ICarUser;
        const drive: Drive = { id: 1 } as Drive;

        driveRepositoryMock.findOne.mockResolvedValue(drive);
        carUseRepositoryMock.findOne.mockResolvedValueOnce(null); // motorista não usa carro
        carRepositoryMock.findOne.mockResolvedValue(null); // carro não encontrado

        const result = await createCarUserServer.execute(data);

        expect(result).toEqual(new Error('o carro já está sendo utilizado por outro motorista'));
    });

    it('deve retornar erro se o carro já estiver em uso', async () => {
        const data: ICarUser = { driveId: 1, carId: 1 } as ICarUser;
        const drive: Drive = { id: 1 } as Drive;
        const car: Car = { id: 1 } as Car;

        driveRepositoryMock.findOne.mockResolvedValue(drive);
        carUseRepositoryMock.findOne.mockResolvedValueOnce(null); // motorista não usa carro
        carRepositoryMock.findOne.mockResolvedValue(car);
        carUseRepositoryMock.findOne.mockResolvedValueOnce({ id: 2 } as CarUse); // carro já em uso

        const result = await createCarUserServer.execute(data);

        expect(result).toEqual(new Error('o carro já esta em uso'));
    });

    it('deve criar e retornar o vínculo CarUse com sucesso', async () => {
        const data: ICarUser = { driveId: 1, carId: 1, motivo: 'Serviço' } as ICarUser;
        const drive: Drive = { id: 1 } as Drive;
        const car: Car = { id: 1 } as Car;
        const newCarUse: CarUse = { car, drive, ...data } as CarUse;

        driveRepositoryMock.findOne.mockResolvedValue(drive);
        carUseRepositoryMock.findOne.mockResolvedValueOnce(null); // motorista não usa carro
        carRepositoryMock.findOne.mockResolvedValue(car);
        carUseRepositoryMock.findOne.mockResolvedValueOnce(null); // carro não em uso
        carUseRepositoryMock.create.mockResolvedValue(newCarUse);

        const result = await createCarUserServer.execute(data);

        expect(carUseRepositoryMock.create).toHaveBeenCalledWith(newCarUse);
        expect(result).toBe(newCarUse);
    });
});