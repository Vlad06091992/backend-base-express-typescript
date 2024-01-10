import express, {Router} from "express";
import {usersService} from "../../services/users-service";
import {jwtService} from "../../services/jwt-service";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";

export const authRouter = Router({})
authRouter.post('/login', async (req, res) => {
    const {loginOrEmail, password} = req.body
    const user = await usersService.checkCredentials(loginOrEmail, password.toString())
    debugger
    if (user) {
        const token = jwtService.createJWT(user)
        res.status(201).send(token)
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED)
    }
})


