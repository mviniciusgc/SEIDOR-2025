import 'reflect-metadata';
import { UpdateCarServer } from '../../../../src/http/service/car/update';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import { ICar } from '../../../../src/http/Repository/interfaceDTO/car';
import Car from '../../../../src/db/entity/car';

describe('UpdateCarServer', () => {
    let updateCarServer: UpdateCarServer;
    let carRepositoryMock: jest.Mocked<ICarRepository>;

    beforeEach(() => {
        carRepositoryMock = {
            findOne: jest.fn(),
            update: jest.fn()
        } as unknown as jest.Mocked<ICarRepository>;

        updateCarServer = new UpdateCarServer(carRepositoryMock);
    });

    it('deve retornar um erro se o carro não estiver cadastrado', async () => {
        const carData: ICar = { id: 1, marca: 'Toyota', cor: 'Preto' } as ICar;

        carRepositoryMock.findOne.mockResolvedValue(null);

        const result = await updateCarServer.execute(carData);

        expect(carRepositoryMock.findOne).toHaveBeenCalledWith(1);
        expect(result).toEqual(new Error('Carro não cadastrado'));
    });

    it('deve atualizar e retornar o carro quando encontrado', async () => {
        const carData: ICar = { id: 2, marca: 'Ford', cor: 'Branco' } as ICar;
        const existingCar: Car = { id: 2 } as Car;
        const updatedCar: Car = { id: 2, marca: 'Ford', cor: 'Branco' } as Car;

        carRepositoryMock.findOne.mockResolvedValue(existingCar);
        carRepositoryMock.update.mockResolvedValue(updatedCar);

        const result = await updateCarServer.execute(carData);

        expect(carRepositoryMock.findOne).toHaveBeenCalledWith(2);
        expect(carRepositoryMock.update).toHaveBeenCalledWith({
            id: 2,
            ...carData
        });
        expect(result).toBe(updatedCar);
    });
});
