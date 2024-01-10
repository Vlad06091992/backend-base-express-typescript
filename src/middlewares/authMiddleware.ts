import {NextFunction, Request, Response} from "express";
import {Result, validationResult} from "express-validator";
import {jwtService} from "../services/jwt-service";
import {usersService} from "../services/users-service";

export const authMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    debugger
    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    console.log(req.headers)

    const token = req.headers.authorization.split(' ')[1]
    const userId = jwtService.getUserIdByToken(token)
    if (userId) {
        const user = await usersService.getUserById(userId)
        req.user = user
        next()
        return
    }
    res.send(401)
};