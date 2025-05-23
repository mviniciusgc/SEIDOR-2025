import 'reflect-metadata';
import { CreateCarUserServer } from '../../../../src/http/service/carUse/create';
import { ICarUseRepository } from '../../../../src/http/Repository/interface/ICarUseRepository';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import { IDriveRepository } from '../../../../src/http/Repository/interface/IDriveRepository';
import { ICarUser } from '../../../../src/http/Repository/interfaceDTO/carUser';
import CarUse from '../../../../src/db/entity/carUse';

// Mock das dependências
const mockCarUseRepository: jest.Mocked<ICarUseRepository> = {
    isCarInUse: jest.fn(),
    isDriverInUse: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn()
} as any;

const mockCarRepository: jest.Mocked<ICarRepository> = {
    findOne: jest.fn()
} as any;

const mockDriveRepository: jest.Mocked<IDriveRepository> = {
    findOne: jest.fn()
} as any;

describe('CreateCarUserServer', () => {
    let createCarUserServer: CreateCarUserServer;

    beforeEach(() => {
        jest.clearAllMocks();
        createCarUserServer = new CreateCarUserServer(
            mockCarUseRepository,
            mockCarRepository,
            mockDriveRepository
        );
    });

    it('deve retornar erro se motorista não for encontrado', async () => {
        mockDriveRepository.findOne.mockResolvedValue(null);

        const result = await createCarUserServer.execute({ driveId: 1, carId: 1 } as ICarUser);

        expect(result).toEqual(new Error('motorista não encontrado'));
    });

    it('deve retornar erro se carro não for encontrado', async () => {
        const mockDrive = { id: 1, nome: 'Teste Motorista' }; 
        
        mockDriveRepository.findOne.mockResolvedValue(mockDrive);
        mockCarRepository.findOne.mockResolvedValue(null);

        const result = await createCarUserServer.execute({ driveId: 1, carId: 1 } as ICarUser);

        expect(result).toEqual(new Error('o carro não encontrado'));
    });

    it('deve retornar erro se carro já estiver em uso', async () => {
        const mockDrive = { id: 1, nome: 'Teste Motorista' }; 
        const mockCar = {
         id: 1,
         modelo: 'Fusca',
         placa: 'ABC-1234',
         cor: 'Azul',
         marca: 'Volkswagen'
         };


        mockDriveRepository.findOne.mockResolvedValue(mockDrive);
        mockCarRepository.findOne.mockResolvedValue(mockCar);
        mockCarUseRepository.isCarInUse.mockResolvedValue(true);

        const result = await createCarUserServer.execute({ driveId: 1, carId: 1 } as ICarUser);

        expect(result).toEqual(new Error('o carro já esta em uso'));
    });

    it('deve retornar erro se motorista já estiver utilizando outro veículo', async () => {
        const mockDrive = { id: 1, nome: 'Teste Motorista' }; 
        const mockCar = {
         id: 1,
         modelo: 'Fusca',
         placa: 'ABC-1234',
         cor: 'Azul',
         marca: 'Volkswagen'
         };

        mockDriveRepository.findOne.mockResolvedValue(mockDrive);
        mockCarRepository.findOne.mockResolvedValue(mockCar);
        mockCarUseRepository.isCarInUse.mockResolvedValue(false);
        mockCarUseRepository.isDriverInUse.mockResolvedValue(true);

        const result = await createCarUserServer.execute({ driveId: 1, carId: 1 } as ICarUser);

        expect(result).toEqual(new Error('o motorista já está utilizando outro veículo'));
    });

    it('deve criar um novo CarUse com sucesso', async () => {
        const mockDrive = { id: 1, nome: 'Teste Motorista' }; 
        const mockCar = {
         id: 1,
         modelo: 'Fusca',
         placa: 'ABC-1234',
         cor: 'Azul',
         marca: 'Volkswagen'
         };
        const mockNewCarUse = { 
        id: 1, 
        car: mockCar, 
        drive: mockDrive,
        dataInicio: new Date('2025-05-23T00:00:00Z'),
        dataFim: null,
        motivo: 'Teste'
    };

        mockDriveRepository.findOne.mockResolvedValue(mockDrive);
        mockCarRepository.findOne.mockResolvedValue(mockCar);
        mockCarUseRepository.isCarInUse.mockResolvedValue(false);
        mockCarUseRepository.isDriverInUse.mockResolvedValue(false);
        mockCarUseRepository.create.mockResolvedValue(mockNewCarUse);

        const data: ICarUser = { 
            id: 1,                 
            driveId: 1, 
            carId: 1,
            dataInicio: new Date('2025-05-23T00:00:00Z'), 
            dataFim: new Date('2025-05-25T00:00:00Z'),          
            motivo: 'Teste'         
            };

        const result = await createCarUserServer.execute(data);

        expect(result).toEqual(mockNewCarUse);
        expect(mockCarUseRepository.create).toHaveBeenCalledWith({
            ...data,
            car: mockCar,
            drive: mockDrive
        });
    });
});