import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {db} from '../db'


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
usersRouter.post('/', (req: Request, res: Response) => {
    const userName = req.body.title
    res.send(userName)
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
