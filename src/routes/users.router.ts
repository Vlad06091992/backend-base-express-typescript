import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {db} from '../db'
import {UserType} from "../types";


export const usersRouter = Router({})

usersRouter.get('/', (req: Request, res: Response) => {
    const title = req.query.title
    if (title) {
        if (typeof title === "string") {
            res.send(db.users.filter(el => el.userName.toLowerCase().indexOf(title) > -1))
        }
    }
    res.send(db.users)
})

usersRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const user = db.users.find(el => el.id === +id)
    if (user) {
        res.send(user)

    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

usersRouter.post('/', (req: Request, res: Response) => {
    const userName = req.body.title
    if (userName) {
        const user = {
            userName: req.body.title,
            id: +new Date(),
        }

        db.users.push(user)
        res.status(HTTP_STATUSES.CREATED_201).send(user)

    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})


usersRouter.put('/:id', (req: Request,  res: Response) => {
    const id = req.params.id

    const user = db.users.find((el: UserType) => el.id === +id)
    if (user) {
        user.userName = req.body.title
        res.status(HTTP_STATUSES.CREATED_201).send(user)
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})




usersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = db.users.findIndex(el => el.id === +id)

    if (indexItem > -1) {
        db.users.splice(indexItem, 1)
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})
