import 'reflect-metadata';
import { UpdateDriveServer } from '../../../../src/http/service/drive/update';
import { IDriveRepository } from '../../../../src/http/Repository/interface/IDriveRepository';
import { IDrive } from '../../../../src/http/Repository/interfaceDTO/drive';
import Drive from '../../../../src/db/entity/drive';

describe('UpdateDriveServer', () => {
    let updateDriveServer: UpdateDriveServer;
    let driveRepositoryMock: jest.Mocked<IDriveRepository>;

    beforeEach(() => {
        driveRepositoryMock = {
            findOne: jest.fn(),
            update: jest.fn()
        } as unknown as jest.Mocked<IDriveRepository>;

        updateDriveServer = new UpdateDriveServer(driveRepositoryMock);
    });

    it('deve atualizar o Drive se ele existir', async () => {
        const data: IDrive = { id: 1, nome: 'Carlos' };
        const mockDrive: Drive = { id: 1, nome: 'Carlos' } as Drive;

        driveRepositoryMock.findOne.mockResolvedValue(mockDrive);
        driveRepositoryMock.update.mockResolvedValue(mockDrive);

        const result = await updateDriveServer.execute(data);

        expect(driveRepositoryMock.findOne).toHaveBeenCalledWith(data.id);
        expect(driveRepositoryMock.update).toHaveBeenCalledWith({ id: data.id, nome: data.nome });
        expect(result).toBe(mockDrive);
    });

    it('deve retornar um erro se o Drive não existir', async () => {
        const data: IDrive = { id: 2, nome: 'Joana' };

        driveRepositoryMock.findOne.mockResolvedValue(null);

        const result = await updateDriveServer.execute(data);

        expect(driveRepositoryMock.findOne).toHaveBeenCalledWith(data.id);
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Usuario não cadastrado');
    });
});
