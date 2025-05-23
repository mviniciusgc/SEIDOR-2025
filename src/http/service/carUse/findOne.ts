import { injectable, inject } from "tsyringe";
import { ICarUseRepository } from '../../Repository/interface/ICarUseRepository'
import CarUse from '../../../db/entity/carUse'
import Drive from '../../../db/entity/drive'
import Car from '../../../db/entity/car'

@injectable()
class FindOneCarServer {

    constructor(
        @inject('CarUseRepository')
        private carUseRepository: ICarUseRepository,
    ) { }

    public async execute(id: number): Promise<CarUse | null> {

        return await this.carUseRepository.findOne(id);
    }
    
}
export { FindOneCarServer }