import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { UsersRepositorires } from "../repositories/UsersRepositories"

interface IComplimentRequest{
    user_sender: string
    user_receiver: string
    tag_id: string
    message?: string
}

class ComplimentService{
    async execute({user_sender, user_receiver, tag_id, message}:IComplimentRequest){
        const usersRepository = getCustomRepository(UsersRepositorires)
        const tagsRepository = getCustomRepository(TagsRepositories)
        const complimentsRepository = getCustomRepository(ComplimentsRepositories)

        //Verificação diferente de nulo
        if(!user_sender){
            throw new Error("Sender user required")
        }

        if(!user_receiver){
            throw new Error("Receiver user required")
        }

        if(!tag_id){
            throw new Error("Tag required")
        }
        
        //Verificações lógicas
        if(user_sender === user_receiver){
            throw new Error("Sender and receiver cannot be the same!")
        }

        //Verificação de existencia no banco
        const userSender = await usersRepository.findOne(user_sender)

        if(!userSender){
            throw new Error("User sender does not exist!")
        }

        const userReceiver = await usersRepository.findOne(user_receiver)

        if(!userReceiver){
            throw new Error("User receiver does not exist!")
        }

        const tag = await tagsRepository.findOne(tag_id)

        if(!tag){
            throw new Error("Tag does not exist!")
        }


        //Criação
        const compliment = complimentsRepository.create({
            user_receiver,
            user_sender,
            tag_id,
            message
        })

        await complimentsRepository.save(compliment)

        return(compliment)

    }
}

export {ComplimentService}