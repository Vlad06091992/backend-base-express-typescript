import express, {Router} from "express";
import {usersService} from "../../services/users-service";
import {jwtService} from "../../services/jwt-service";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {authService} from "../../services/autth-service";
import {body} from "express-validator";

export const authRouter = Router({})
authRouter.post('/login', async (req, res) => {
    const {login, password} = req.body
    const user = await usersService.checkCredentials(login, password?.toString())
    if (user) {
        const token = jwtService.createJWT(user)
        res.status(201).send({access:token})
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED)
    }
})

authRouter.post('/registration', async (req, res) => {
    const user = await authService.createUser(req.body)
    debugger
    if (user) {
        const token = jwtService.createJWT(user)
        res.sendStatus(HTTP_STATUSES.CREATED_201)
    } else {
        res.sendStatus(400)
    }
})


authRouter.post('/confirm-email', async (req, res) => {
    const result = await authService.confirmEmail(req.body.code)
    if (result) {
        res.sendStatus(HTTP_STATUSES.CREATED_201)
    } else {
        res.sendStatus(400)
    }
})


