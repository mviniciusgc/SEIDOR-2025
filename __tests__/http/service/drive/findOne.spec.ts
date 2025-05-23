import 'reflect-metadata';
import { FindOneDriveServer } from '../../../../src/http/service/drive/findOne';
import { IDriveRepository } from '../../../../src/http/Repository/interface/IDriveRepository';
import Drive from '../../../../src/db/entity/drive';

describe('FindOneDriveServer', () => {
    let findOneDriveServer: FindOneDriveServer;
    let driveRepositoryMock: jest.Mocked<IDriveRepository>;

    beforeEach(() => {
        driveRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<IDriveRepository>;

        findOneDriveServer = new FindOneDriveServer(driveRepositoryMock);
    });

    it('deve chamar findOne com o ID correto e retornar o Drive', async () => {
        const id = 10;
        const mockDrive: Drive = { id, nome: 'Maria', cpf: '12345678900' } as Drive;

        driveRepositoryMock.findOne.mockResolvedValue(mockDrive);

        const result = await findOneDriveServer.execute(id);

        expect(driveRepositoryMock.findOne).toHaveBeenCalledWith(id);
        expect(result).toBe(mockDrive);
    });

    it('deve retornar null se não encontrar o Drive', async () => {
        const id = 20;

        driveRepositoryMock.findOne.mockResolvedValue(null);

        const result = await findOneDriveServer.execute(id);

        expect(driveRepositoryMock.findOne).toHaveBeenCalledWith(id);
        expect(result).toBeNull();
    });
});
