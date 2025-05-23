import CarUse from '../../../db/entity/carUse'
import Car from '../../../db/entity/car'
import Drive from '../../../db/entity/drive'
import { ICarUseRepository } from '../interface/ICarUseRepository'
import {AppDataSource} from '../../../db/conection/data-source'

const carUseRepository = AppDataSource.getRepository(CarUse)

class CarUseRepository implements ICarUseRepository {

    public async create(data: CarUse): Promise<CarUse> {
        return carUseRepository.save(data)
    }
    
    public async findOne(id: number): Promise<CarUse | null> {
        return carUseRepository.findOne({
            where: {
                id: id
            }
        })
    }

    public async find(): Promise<CarUse[]> {

        return carUseRepository.find({
            relations: ['drive', 'car'], 
          })
    }

    public async findById(id: number): Promise<CarUse | null> {
        return carUseRepository.findOne({
            where: {
                id
            }
        })
    }

    public async update(data: CarUse): Promise<CarUse> {
        return carUseRepository.save({...data})
    }

    public async delete(id: number): Promise<void> {
        carUseRepository.delete(id)
    }

    public async isCarInUse(carId: number): Promise<boolean> {
        const result = await carUseRepository.findOne({
            where: { car: { id:carId } }
        });
        return result != null;
    }

    public async isDriverInUse(driveId: number): Promise<boolean> {
        const result = await carUseRepository.findOne({
            where: { drive: { id: driveId } }
        });
        return result != null;
    }
}

export { CarUseRepository }