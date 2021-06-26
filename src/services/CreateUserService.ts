import { getCustomRepository } from "typeorm"
import { UsersRepositorires } from "../repositories/UsersRepositories"
import {hash} from "bcryptjs"

interface IUserRequest {
    name: string
    email: string
    password: string
    admin?: boolean
}

class CreateUserService{
    async execute({name, email, admin = false, password}:IUserRequest){
        const userRepository = getCustomRepository(UsersRepositorires)

        if(!email){
            throw new Error("Email required")
        }

        if(!name){
            throw new Error("Name required")
        }

        if(!password){
            throw new Error("Password required")
        }

        if(password.length < 8){
            throw new Error("Password must be minimum 8 characters")
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        })

        if(userAlreadyExists){
            throw new Error("User already exists!")
        }

        const passwordHash = await hash(password, 8)

        const user = userRepository.create({
            name,
            email,
            password:passwordHash,
            admin
        })

        await userRepository.save(user)
    }
}

export {CreateUserService}