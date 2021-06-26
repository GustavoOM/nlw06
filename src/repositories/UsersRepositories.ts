import {EntityRepository, Repository} from "typeorm"
import {User} from "../entities/User"

@EntityRepository(User)
class UsersRepositorires extends Repository<User>{
    
}

export {UsersRepositorires}