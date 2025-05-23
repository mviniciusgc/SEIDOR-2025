import 'reflect-metadata';
import { UpdateCarUseServer } from '../../../../src/http/service/carUse/update';
import { ICarUseRepository } from '../../../../src/http/Repository/interface/ICarUseRepository';
import CarUser from '../../../../src/db/entity/carUse';

describe('UpdateCarUseServer', () => {
    let updateCarUseServer: UpdateCarUseServer;
    let carUseRepositoryMock: jest.Mocked<ICarUseRepository>;

    beforeEach(() => {
        carUseRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn()
        } as unknown as jest.Mocked<ICarUseRepository>;

        updateCarUseServer = new UpdateCarUseServer(carUseRepositoryMock);
    });

    it('deve atualizar e retornar o CarUser quando encontrado', async () => {
        const id = 1;
        const carUse: CarUser = { id, dataFim: null } as CarUser;
        const updatedCarUse: CarUser = { ...carUse, dataFim: new Date() };

        carUseRepositoryMock.findById.mockResolvedValue(carUse);
        carUseRepositoryMock.update.mockImplementation(async (carUse) => carUse);

        const result = await updateCarUseServer.execute(id);

        expect(carUseRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(carUseRepositoryMock.update).toHaveBeenCalledWith(expect.objectContaining({ id }));
        expect((result as CarUser).dataFim).toBeInstanceOf(Date);
    });

    it('deve retornar um erro quando o registro não for encontrado', async () => {
        const id = 999;

        carUseRepositoryMock.findById.mockResolvedValue(null);

        const result = await updateCarUseServer.execute(id);

        expect(carUseRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('registro não cadastrado');
    });
});
