import { getCustomRepository } from "typeorm"
import { UserRepositorires } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string
    email: string
    admin?: boolean
}

class CreateUserService{
    async execute({name, email, admin}:IUserRequest){
        const userRepository = getCustomRepository(UserRepositorires)

        if(!email){
            throw new Error("Email incorrect")
        }

        if(!name){
            throw new Error("Name incorrect")
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        })

        if(userAlreadyExists){
            throw new Error("User already exists!")
        }

        const user = userRepository.create({
            name,
            email,
            admin
        })

        await userRepository.save(user)
    }
}

export {CreateUserService}