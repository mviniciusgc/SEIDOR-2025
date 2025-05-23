import 'reflect-metadata';
import { container } from 'tsyringe';
import { FindOneCarServer } from '../../../../src/http/service/carUse/findOne';
import { ICarUseRepository } from '../../../../src/http/Repository/interface/ICarUseRepository';
import CarUse from '../../../../src/db/entity/carUse';

describe('FindOneCarServer', () => {
  let findOneCarServer: FindOneCarServer;
  let mockCarUseRepository: jest.Mocked<ICarUseRepository>;

  beforeEach(() => {
    // Mock do repositório
    mockCarUseRepository = {
      findOne: jest.fn(),
      // pode adicionar outros métodos se precisar, com jest.fn()
    } as unknown as jest.Mocked<ICarUseRepository>;

    // Resolver a dependência via tsyringe container
    container.registerInstance('CarUseRepository', mockCarUseRepository);

    // Instanciar o service
    findOneCarServer = container.resolve(FindOneCarServer);
  });

  it('deve retornar um CarUse quando encontrar pelo id', async () => {
    const mockCarUse: CarUse = {
      id: 1,
      car: {} as any,   // preencha conforme sua entidade CarUse
      drive: {} as any,
      dataInicio: new Date(),
      dataFim: null,
      motivo: 'teste',
    };

    mockCarUseRepository.findOne.mockResolvedValue(mockCarUse);

    const result = await findOneCarServer.execute(1);

    expect(mockCarUseRepository.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCarUse);
  });

  it('deve retornar null se não encontrar o CarUse', async () => {
    mockCarUseRepository.findOne.mockResolvedValue(null);

    const result = await findOneCarServer.execute(999);

    expect(mockCarUseRepository.findOne).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });
});