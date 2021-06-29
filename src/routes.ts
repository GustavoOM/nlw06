import {Router} from "express"
import {CreateUserController} from "./controllers/CreateUserController"
import {CreateTagController} from "./controllers/CreateTagController"
import {ensureAdmin} from "./middlewares/ensureAdmin"
import { AuthenticateUserControler } from "./controllers/AuthenticateUserController"
import { ComplimentController } from "./controllers/CreateComplimentController"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListAllTagsController } from "./controllers/ListAllTagsController"
import { ListUserController } from "./controllers/ListUsersController"

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserControler = new AuthenticateUserControler()
const complimentControler = new ComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listAllTags = new ListAllTagsController()
const listUserController = new ListUserController()

router.post("/users", createUserController.handle)
router.get("/users", listUserController.handle)
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle)

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)

router.get("/tags", ensureAuthenticated, listAllTags.handle)
router.post("/login", authenticateUserControler.handle)

router.post("/compliments", ensureAuthenticated, complimentControler.handle)

export {router}