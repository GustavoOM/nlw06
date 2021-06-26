import {Router} from "express"
import {CreateUserController} from "./controllers/CreateUserController"
import {CreateTagController} from "./controllers/CreateTagController"
import {ensureAdmin} from "./middlewares/ensureAdmin"
import { AuthenticateUserControler } from "./controllers/AuthenticateUserController"
import { ComplimentController } from "./controllers/CreateComplimentController"

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserControler = new AuthenticateUserControler()
const complimentControler = new ComplimentController()

router.post("/users", createUserController.handle)

router.post("/tags", ensureAdmin, createTagController.handle)

router.post("/login", authenticateUserControler.handle)

router.post("/compliments", complimentControler.handle)

export {router}