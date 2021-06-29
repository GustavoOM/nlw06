import { classToPlain } from "class-transformer"
import { getCustomRepository } from "typeorm"
import { UsersRepositorires } from "../repositories/UsersRepositories"


class ListUsersService {
    async listAllUsers(){
        const usersRepositories = getCustomRepository(UsersRepositorires)

        const users = await usersRepositories.find()

        return classToPlain(users)
    }
}

export {ListUsersService}