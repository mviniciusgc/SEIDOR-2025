import 'reflect-metadata';
import { CreateDriveServer } from '../../../../src/http/service/drive/create';
import { IDriveRepository } from '../../../../src/http/Repository/interface/IDriveRepository';
import { IDrive } from '../../../../src/http/Repository/interfaceDTO/drive';
import Drive from '../../../../src/db/entity/drive';

describe('CreateDriveServer', () => {
    let createDriveServer: CreateDriveServer;
    let driveRepositoryMock: jest.Mocked<IDriveRepository>;

    beforeEach(() => {
        driveRepositoryMock = {
            create: jest.fn()
        } as unknown as jest.Mocked<IDriveRepository>;

        createDriveServer = new CreateDriveServer(driveRepositoryMock);
    });

    it('deve criar e retornar um novo Drive', async () => {
        const driveData: IDrive = { nome: 'João'};
        const createdDrive: Drive = { id: 1, ...driveData } as Drive;

        driveRepositoryMock.create.mockResolvedValue(createdDrive);

        const result = await createDriveServer.execute(driveData);

        expect(driveRepositoryMock.create).toHaveBeenCalledWith(driveData);
        expect(result).toBe(createdDrive);
    });
});
