import { Router } from 'express';
import { CarUserController } from '../../controller/carUse'

const carUseRouter = Router();
const carUseController = new CarUserController()

carUseRouter.post('/', carUseController.create)
carUseRouter.get('/find', carUseController.find)
carUseRouter.get('/findOne/:id', carUseController.findOne)
carUseRouter.patch('/update/:id', carUseController.patch)
carUseRouter.delete('/delete/:id', carUseController.delete)

export { carUseRouter };