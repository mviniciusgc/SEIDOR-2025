import 'reflect-metadata';
import { FindDriveServer } from '../../../../src/http/service/drive/find';
import { IDriveRepository } from '../../../../src/http/Repository/interface/IDriveRepository';
import Drive from '../../../../src/db/entity/drive';

jest.mock('typeorm', () => ({
    ILike: jest.fn((value) => `ILike(${value})`)
}));

describe('FindDriveServer', () => {
    let findDriveServer: FindDriveServer;
    let driveRepositoryMock: jest.Mocked<IDriveRepository>;

    beforeEach(() => {
        driveRepositoryMock = {
            find: jest.fn()
        } as unknown as jest.Mocked<IDriveRepository>;

        findDriveServer = new FindDriveServer(driveRepositoryMock);
    });

    it('deve chamar find com a condição de nome usando ILike', async () => {
        const nome = 'João';
        const mockDrives: Drive[] = [{ id: 1, nome: 'João' }] as Drive[];

        driveRepositoryMock.find.mockResolvedValue(mockDrives);

        const result = await findDriveServer.execute(nome);

        expect(driveRepositoryMock.find).toHaveBeenCalledWith({
            nome: `ILike(%${nome}%)`
        });

        expect(result).toBe(mockDrives);
    });

    it('deve chamar find com objeto vazio se nome não for passado', async () => {
        const nome = '';
        const mockDrives: Drive[] = [] as Drive[];

        driveRepositoryMock.find.mockResolvedValue(mockDrives);

        const result = await findDriveServer.execute(nome);

        expect(driveRepositoryMock.find).toHaveBeenCalledWith({});
        expect(result).toBe(mockDrives);
    });
});
