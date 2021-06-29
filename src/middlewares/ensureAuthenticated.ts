import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string
}

export function ensureAuthenticated(request:Request, response:Response, next: NextFunction){
    const authToken = request.headers.authorization
    
    if(!authToken){
        return response.status(401).json({message: "Token missing!"})
    }

    const token = authToken.replace("Bearer ", "")

    try{
        const {sub} = verify(token, "58f706c72f2d8d80fb25537f4f6dcac4") as IPayLoad
        
        request.user_id = sub

        return next();
    } catch (err){
        return response.status(401).json({message:"Invalid Token!"})
    }
    

}