import { getCustomRepository } from "typeorm"
import { UsersRepositorires } from "../repositories/UsersRepositories"
import {compare} from "bcryptjs"
import {sign} from "jsonwebtoken"

interface IAuthenticateRequest{
    email: string
    password: string
}

class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositorires)

        const user = await usersRepositories.findOne({email})

        if(!user){
            throw new Error("Invalid email or password!")
        }

        const passwordMatch = await compare(password,user.password)

        if(!passwordMatch){
            throw new Error("Invalid email or password!")
        }

        const token = sign({
            email:user.email
        },"58f706c72f2d8d80fb25537f4f6dcac4", {
            subject: user.id,
            expiresIn: "1d",
        })

        return token
    }
}

export {AuthenticateUserService}