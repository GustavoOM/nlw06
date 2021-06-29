import {Request, Response} from "express"
import { ComplimentService } from "../services/ComplimentService"


class ComplimentController{

    async handle(request: Request, response: Response){
        const {user_receiver, tag_id, message} = request.body
        const {user_id} = request
        const complimentService = new ComplimentService()

        const compliment = await complimentService.execute({user_sender:user_id,user_receiver, tag_id, message})

        return response.json(compliment)
    }

}

export {ComplimentController}