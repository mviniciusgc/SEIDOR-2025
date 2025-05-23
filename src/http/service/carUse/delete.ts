import { injectable, inject } from "tsyringe";
import { ICarUseRepository } from '../../Repository/interface/ICarUseRepository'

@injectable()
class DeleteCarUserServer {

    constructor(
        @inject('CarUseRepository')
        private carUseRepository: ICarUseRepository
    ) { }

    public async execute(id: number): Promise<void> {
        await this.carUseRepository.delete(id);
    }
    
}
export { DeleteCarUserServer }