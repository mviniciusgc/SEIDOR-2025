import 'reflect-metadata';
import { FindOneCarServer } from '../../../../src/http/service/car/findOne';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import Car from '../../../../src/db/entity/car';

describe('FindOneCarServer', () => {
    let findOneCarServer: FindOneCarServer;
    let carRepositoryMock: jest.Mocked<ICarRepository>;

    beforeEach(() => {
        carRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<ICarRepository>;

        findOneCarServer = new FindOneCarServer(carRepositoryMock);
    });

    it('deve retornar um carro quando encontrado', async () => {
        const mockCar: Car = { id: 1 } as Car;

        carRepositoryMock.findOne.mockResolvedValue(mockCar);

        const result = await findOneCarServer.execute(1);

        expect(carRepositoryMock.findOne).toHaveBeenCalledWith(1);
        expect(result).toBe(mockCar);
    });

    it('deve retornar null quando nenhum carro for encontrado', async () => {
        carRepositoryMock.findOne.mockResolvedValue(null);

        const result = await findOneCarServer.execute(999);

        expect(carRepositoryMock.findOne).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });
});
