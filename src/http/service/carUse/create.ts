import { injectable, inject } from "tsyringe";
import { ICarUseRepository } from '../../Repository/interface/ICarUseRepository'
import { ICarUser } from '../../Repository/interfaceDTO/carUser'
import CarUse from '../../../db/entity/carUse'
import { ICarRepository } from '../../Repository/interface/ICarRepository'
import { IDriveRepository } from '../../Repository/interface/IDriveRepository'

@injectable()
class CreateCarUserServer {

    constructor(
        @inject('CarUseRepository')
        private carUseRepository: ICarUseRepository,
        @inject('CarRepository')
        private carRepository: ICarRepository,
        @inject('DriveRepository')
        private driveRepository: IDriveRepository
    ) { }

    public async execute(data:ICarUser ): Promise<CarUse | Error> {
        
        const drive = await this.driveRepository.findOne(data.driveId);

        if(!drive){
            return new Error("motorista não encontrado")
        }

        const car = await this.carRepository.findOne(data.carId);
        
        if(!car){
            return  new Error("o carro não encontrado")
        }
        
        // Verifica se o carro já está sendo utilizando        
        const carUse = await this.carUseRepository.isCarInUse(car.id);
        if(carUse){
            return  new Error("o carro já esta em uso")
        }

        // Verifica se o motorista já está utilizando outro veículo        
        const driveUse = await this.carUseRepository.isDriverInUse(drive.id!);
        
        if(driveUse){
            return  new Error("o motorista já está utilizando outro veículo")
        }
        
        const newCar: CarUse = {car,drive,...data}

        return await this.carUseRepository.create(newCar);
    }
    
}
export { CreateCarUserServer }