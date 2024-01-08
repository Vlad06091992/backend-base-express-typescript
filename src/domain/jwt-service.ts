import {UserType} from "../types";
import jwt from "jsonwebtoken"
import {WithId} from "mongodb";

const settings = {
    JWT_SECRET : process.env.JWT_SECRET || '234'
}

export const jwtService = {
    createJWT(user:WithId<UserType>){
        const token = jwt.sign({userId:user._id},settings.JWT_SECRET,{expiresIn:'1h'})
        return token
    }
}