import {Router} from "express"
import {CreateUserController} from "./constrollers/CreateUserConstroller"

const router = Router()

const createUserController = new CreateUserController()

router.post("/users", createUserController.handle)

export {router}