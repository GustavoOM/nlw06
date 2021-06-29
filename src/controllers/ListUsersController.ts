import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";


class ListUserController{
    async handle(request:Request, response:Response){

        const listUsersService = new ListUsersService();

        const user = await listUsersService.listAllUsers()

        return response.json(user)
    }
}

export {ListUserController}