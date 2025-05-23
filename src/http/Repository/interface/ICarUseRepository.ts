import CarUse from '../../../db/entity/carUse'

interface ICarUseRepository {
    create(data: CarUse): Promise<CarUse>;
    find(): Promise<CarUse[]>;
    findOne(id: number): Promise<CarUse | null>;
    update(data: CarUse): Promise<CarUse>;
    delete(id: number): Promise<void>;
    isCarInUse(carId: number): Promise<boolean>;
    isDriverInUse(carId: number): Promise<boolean>
}

export { ICarUseRepository }