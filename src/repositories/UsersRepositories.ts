import {EntityRepository, Repository} from "typeorm"
import {User} from "../entities/User"

@EntityRepository(User)
class UserRepositorires extends Repository<User>{
    
}

export {UserRepositorires}