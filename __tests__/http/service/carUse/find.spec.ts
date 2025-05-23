import 'reflect-metadata';
import { FindCarUseServer } from '../../../../src/http/service/carUse/find';
import { ICarUseRepository } from '../../../../src/http/Repository/interface/ICarUseRepository';
import CarUse from '../../../../src/db/entity/carUse';

describe('FindCarUseServer', () => {
    let findCarUseServer: FindCarUseServer;
    let carUseRepositoryMock: jest.Mocked<ICarUseRepository>;

    beforeEach(() => {
        carUseRepositoryMock = {
            find: jest.fn()
        } as unknown as jest.Mocked<ICarUseRepository>;

        findCarUseServer = new FindCarUseServer(carUseRepositoryMock);
    });

    it('deve retornar uma lista de CarUse', async () => {
        const carUses: CarUse[] = [
            { id: 1 } as CarUse,
            { id: 2 } as CarUse
        ];

        carUseRepositoryMock.find.mockResolvedValue(carUses);

        const result = await findCarUseServer.execute();

        expect(carUseRepositoryMock.find).toHaveBeenCalled();
        expect(result).toBe(carUses);
    });
});
