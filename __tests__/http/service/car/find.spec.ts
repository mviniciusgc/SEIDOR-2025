import 'reflect-metadata';
import { FindCarServer } from '../../../../src/http/service/car/find';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import Car from '../../../../src/db/entity/car';
import { ILike } from 'typeorm';

describe('FindCarServer', () => {
    let findCarServer: FindCarServer;
    let carRepositoryMock: jest.Mocked<ICarRepository>;

    beforeEach(() => {
        carRepositoryMock = {
            find: jest.fn()
        } as unknown as jest.Mocked<ICarRepository>;

        findCarServer = new FindCarServer(carRepositoryMock);
    });

    it('deve buscar carros filtrando por marca e cor', async () => {
        const mockCars: Car[] = [{ id: 1 } as Car];

        carRepositoryMock.find.mockResolvedValue(mockCars);

        const result = await findCarServer.execute('Toyota', 'Preto');

        expect(carRepositoryMock.find).toHaveBeenCalledWith({
            marca: ILike('%Toyota%'),
            cor: ILike('%Preto%')
        });

        expect(result).toBe(mockCars);
    });

    it('deve buscar carros filtrando apenas por marca', async () => {
        const mockCars: Car[] = [{ id: 2 } as Car];

        carRepositoryMock.find.mockResolvedValue(mockCars);

        const result = await findCarServer.execute('Ford');

        expect(carRepositoryMock.find).toHaveBeenCalledWith({
            marca: ILike('%Ford%')
        });

        expect(result).toBe(mockCars);
    });

    it('deve buscar carros filtrando apenas por cor', async () => {
        const mockCars: Car[] = [{ id: 3 } as Car];

        carRepositoryMock.find.mockResolvedValue(mockCars);

        const result = await findCarServer.execute(undefined, 'Branco');

        expect(carRepositoryMock.find).toHaveBeenCalledWith({
            cor: ILike('%Branco%')
        });

        expect(result).toBe(mockCars);
    });

    it('deve buscar carros sem nenhum filtro', async () => {
        const mockCars: Car[] = [{ id: 4 } as Car];

        carRepositoryMock.find.mockResolvedValue(mockCars);

        const result = await findCarServer.execute();

        expect(carRepositoryMock.find).toHaveBeenCalledWith({});
        expect(result).toBe(mockCars);
    });
});
