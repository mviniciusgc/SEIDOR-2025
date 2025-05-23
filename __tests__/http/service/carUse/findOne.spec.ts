import 'reflect-metadata';
import { FindOneCarServer } from '../../../../src/http/service/carUse/findOne';
import { ICarUseRepository } from '../../../../src/http/Repository/interface/ICarUseRepository';
import CarUse from '../../../../src/db/entity/carUse';
import Drive from '../../../../src/db/entity/drive';
import Car from '../../../../src/db/entity/car';

describe('FindOneCarServer', () => {
    let findOneCarServer: FindOneCarServer;
    let carUseRepositoryMock: jest.Mocked<ICarUseRepository>;

    beforeEach(() => {
        carUseRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<ICarUseRepository>;

        findOneCarServer = new FindOneCarServer(carUseRepositoryMock);
    });

    it('deve retornar um CarUse quando encontrado', async () => {
        const drive: Drive = { id: 1 } as Drive;
        const car: Car = { id: 2 } as Car;
        const carUse: CarUse = { id: 3, drive, car } as CarUse;

        carUseRepositoryMock.findOne.mockResolvedValue(carUse);

        const result = await findOneCarServer.execute(drive, car);

        expect(carUseRepositoryMock.findOne).toHaveBeenCalledWith(drive, car);
        expect(result).toBe(carUse);
    });

    it('deve retornar null quando não encontrar um CarUse', async () => {
        const drive: Drive = { id: 1 } as Drive;
        const car: Car = { id: 2 } as Car;

        carUseRepositoryMock.findOne.mockResolvedValue(null);

        const result = await findOneCarServer.execute(drive, car);

        expect(carUseRepositoryMock.findOne).toHaveBeenCalledWith(drive, car);
        expect(result).toBeNull();
    });
});
