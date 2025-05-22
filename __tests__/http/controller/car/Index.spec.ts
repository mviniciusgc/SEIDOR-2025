import 'reflect-metadata';
import { CarController } from '../../../../src/http/controller/car';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn()
  }
}));

describe('CarController', () => {
  let carController: CarController;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    carController = new CarController();

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    sendMock = jest.fn();

    mockResponse = {
      status: statusMock,
      json: jsonMock,
      send: sendMock
    };
  });

  describe('create', () => {
    it('should create a car successfully', async () => {
      const mockRequest = {
        body: { cor: 'azul', marca: 'Fiat', placa: 'ABC1234' }
      } as Request;

      const mockExecute = jest.fn().mockResolvedValue({ id: 1 });
      (container.resolve as jest.Mock).mockReturnValue({ execute: mockExecute });

      await carController.create(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return 400 if data is missing', async () => {
      const mockRequest = { body: { marca: '', cor: '', placa: '' } } as Request;

      await carController.create(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Dados informados estão incorretos' });
    });
  });

  describe('find', () => {
    it('should find cars successfully', async () => {
      const mockRequest = { body: { marca: 'Fiat', cor: 'azul' } } as Request;

      const mockExecute = jest.fn().mockResolvedValue([{ id: 1 }]);
      (container.resolve as jest.Mock).mockReturnValue({ execute: mockExecute });

      await carController.find(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('should return car by id', async () => {
      const mockRequest = { params: { id: '1' } } as unknown as Request;

      const mockExecute = jest.fn().mockResolvedValue({ id: 1 });
      (container.resolve as jest.Mock).mockReturnValue({ execute: mockExecute });

      await carController.findOne(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return 400 if id is missing', async () => {
      const mockRequest = { params: {} } as unknown as Request;

      await carController.findOne(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({ message: 'o Id não pode ser nullo' });
    });
  });

  describe('update', () => {
    it('should update a car', async () => {
      const mockRequest = { params: { id: '1' }, body: { cor: 'verde', marca: 'Ford', placa: 'XYZ9876' } } as unknown as Request;

      const mockExecute = jest.fn().mockResolvedValue({ id: 1 });
      (container.resolve as jest.Mock).mockReturnValue({ execute: mockExecute });

      await carController.update(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return 400 if id is missing', async () => {
      const mockRequest = { params: {}, body: {} } as unknown as Request;

      await carController.update(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({ message: 'o Id não pode ser nullo' });
    });
  });

  describe('delete', () => {
    it('should delete a car', async () => {
      const mockRequest = { params: { id: '1' } } as unknown as Request;

      const mockExecute = jest.fn().mockResolvedValue(undefined);
      (container.resolve as jest.Mock).mockReturnValue({ execute: mockExecute });

      await carController.delete(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith('Carro excluido com sucesso');
    });

    it('should return 400 if id is missing', async () => {
      const mockRequest = { params: {} } as unknown as Request;

      await carController.delete(mockRequest, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({ message: 'o Id não pode ser nullo' });
    });
  });
});
