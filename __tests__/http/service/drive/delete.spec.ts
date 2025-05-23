import 'reflect-metadata';
import { DeleteDriveServer } from '../../../../src/http/service/drive/delete';
import { IDriveRepository } from '../../../../src/http/Repository/interface/IDriveRepository';

describe('DeleteDriveServer', () => {
    let deleteDriveServer: DeleteDriveServer;
    let driveRepositoryMock: jest.Mocked<IDriveRepository>;

    beforeEach(() => {
        driveRepositoryMock = {
            delete: jest.fn()
        } as unknown as jest.Mocked<IDriveRepository>;

        deleteDriveServer = new DeleteDriveServer(driveRepositoryMock);
    });

    it('deve chamar o método delete com o ID correto', async () => {
        const id = 42;

        await deleteDriveServer.execute(id);

        expect(driveRepositoryMock.delete).toHaveBeenCalledWith(id);
        expect(driveRepositoryMock.delete).toHaveBeenCalledTimes(1);
    });
});
