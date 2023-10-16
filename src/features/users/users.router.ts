import express, {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../../../src/http_statuses/http_statuses";
import {db} from '../../../src/db'
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    RootDBType,
    UserType
} from "../../../src/types";
import {UserCreateModel} from "../users/model/UserCreateModel";
import {UserViewModel} from "../users/model/UserViewModel";
import {QueryUserModel} from "../users/model/QueryUserModel";
import {URIParamsUserIdModel} from "../users/model/URIParamsUserIdModel";
import {UserUpdateModel} from "../users/model/UserUpdateModel";


export const mapEntityToViewModel = (dbEntity:UserType):UserViewModel =>({id:dbEntity.id, userName:dbEntity.userName})





export const getUsersRouter = (db:RootDBType) => {
    const router = express.Router()


    router.get('/', (req: RequestWithQuery<QueryUserModel>, res: Response<UserViewModel[]>) => {
        const userName = req.query.userName
        if (userName) {
            if (typeof userName === "string") {
                res.send(db.users.filter(el => el.userName.toLowerCase().indexOf(userName) > -1))
            }
        }
        res.send(db.users.map(el=>mapEntityToViewModel(el)))
    })

    router.get('/:id', (req: RequestWithParams<URIParamsUserIdModel>, res: Response<UserViewModel | number> ) => {
        const id = req.params.id
        const user = db.users.find(el => el.id === +id)
        if (user) {
            res.send(mapEntityToViewModel(user))

        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

    router.post('/', (req: RequestWithBody<UserCreateModel>, res: Response<UserViewModel>) => {
        const userName = req.body.userName
        if (userName) {
            const user = {
                userName: req.body.userName,
                id: +new Date(),
            }

            db.users.push(user)
            res.status(HTTP_STATUSES.CREATED_201).send(mapEntityToViewModel(user))

        } else {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }
    })


    router.put('/:id', (req: RequestWithParamsAndBody<URIParamsUserIdModel,UserUpdateModel>,  res: Response<UserViewModel | number>) => {
        const id = req.params.id

        const user = db.users.find((el: UserType) => el.id === +id)
        if (user) {
            user.userName = req.body.userName
            res.status(HTTP_STATUSES.CREATED_201).send(mapEntityToViewModel(user))
        } else {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }
    })




    router.delete('/:id', (req: RequestWithParams<URIParamsUserIdModel>, res: Response<number>) => {
        const id = req.params.id
        const indexItem = db.users.findIndex(el => el.id === +id)

        if (indexItem > -1) {
            db.users.splice(indexItem, 1)
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

    return router

}

