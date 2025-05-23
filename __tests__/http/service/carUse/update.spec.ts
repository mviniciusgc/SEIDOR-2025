import 'reflect-metadata';
import { container } from 'tsyringe';
import { UpdateCarUseServer } from '../../../../src/http/service/carUse/update';
import { ICarUseRepository } from '../../../../src/http/Repository/interface/ICarUseRepository';
import CarUser from '../../../../src/db/entity/carUse';

describe('UpdateCarUseServer', () => {
  let updateCarUseServer: UpdateCarUseServer;
  let mockCarUseRepository: jest.Mocked<ICarUseRepository>;

  beforeEach(() => {
    mockCarUseRepository = {
      findOne: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<ICarUseRepository>;

    container.registerInstance('CarUseRepository', mockCarUseRepository);
    updateCarUseServer = container.resolve(UpdateCarUseServer);
  });

  it('deve atualizar o dataFim do CarUse e retornar o registro atualizado', async () => {
    const mockCarUse: CarUser = {
      id: 1,
      car: {} as any,
      drive: {} as any,
      dataInicio: new Date('2023-01-01T00:00:00Z'),
      dataFim: null,
      motivo: 'teste',
    };

    const updatedCarUse: CarUser = { ...mockCarUse, dataFim: new Date() };

    mockCarUseRepository.findOne.mockResolvedValue(mockCarUse);
    mockCarUseRepository.update.mockImplementation(async (carUse) => carUse);

    const result = await updateCarUseServer.execute(1);

    expect(mockCarUseRepository.findOne).toHaveBeenCalledWith(1);
    expect(mockCarUseRepository.update).toHaveBeenCalled();

    expect(result).not.toBeInstanceOf(Error);
    expect((result as CarUser).dataFim).toBeInstanceOf(Date);
  });

  it('deve retornar erro quando o registro não existir', async () => {
    mockCarUseRepository.findOne.mockResolvedValue(null);

    const result = await updateCarUseServer.execute(999);

    expect(mockCarUseRepository.findOne).toHaveBeenCalledWith(999);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe("registro não cadastrado");
  });
});