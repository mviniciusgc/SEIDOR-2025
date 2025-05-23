import { Response, Request } from 'express';
import { container } from 'tsyringe';
 import { CreateCarUserServer } from '../../service/carUse/create'
 import { FindCarUseServer } from '../../service/carUse/find'
 import { FindOneCarServer } from '../../service/carUse/findOne'
 import { UpdateCarUseServer } from '../../service/carUse/update'
 import { DeleteCarUserServer } from '../../service/carUse/delete'
 import { ICarUser } from '../../Repository/interfaceDTO/carUser'

class CarUserController {

    public async create(request: Request, response: Response): Promise<Response> {
        try{

            const data:ICarUser = request.body ;
            if(!data.carId || !data.dataInicio || !data.driveId || !data.motivo){
                response.status(400).json({message:`Dados informados incorretos`})
            }
            
            const createCarUse = container.resolve(CreateCarUserServer)
            const result = await createCarUse.execute(data)

            if(result instanceof Error){
                return response.status(400).json(result.message)    
            }

            return response.status(201).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao criar o novo Carro: ${e}`})
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try{
            const findCar = container.resolve(FindCarUseServer)
            const result = await findCar.execute()

            return response.status(200).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao buscar os Carros: ${e}`})
        }
    }

    public async patch(request: Request, response: Response): Promise<Response> {
        try{

            const {id} = request.params ;
            
            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const patchCar = container.resolve(UpdateCarUseServer)
            const result = await patchCar.execute(Number(id))

            if(result instanceof Error){
                return response.status(400).json(result.message)    
            }

            return response.status(201).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao criar o novo Carro: ${e}`})
        }
    }

    public async findOne(request: Request, response: Response): Promise<Response> {
        try{
            const {id} = request.params ;

            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const findOne = container.resolve(FindOneCarServer)
            const result = await findOne.execute(Number(id))

            return response.status(200).json(result ?? {});

        }catch(e) {
            return response.status(400).json({message:`Erro ao buscar o Carro: ${e}`})
        }
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        try{

            const {id} = request.params ;

            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const deleteCarUser = container.resolve(DeleteCarUserServer)
            await deleteCarUser.execute(Number(id))

            return response.status(200).json("Excluido com sucesso");

        }catch(e) {
            return response.status(400).json({message:`${e}`})
        }
    }
}

export { CarUserController }