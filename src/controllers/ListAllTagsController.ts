import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";


class ListAllTagsController{
    async handle(request:Request, response:Response){

        const listAllTagsService = new ListTagsService();

        const tags = await listAllTagsService.listAllTags()

        return response.json(tags)
    }
}

export {ListAllTagsController}