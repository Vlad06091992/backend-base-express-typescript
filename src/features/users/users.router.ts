import express, {Response} from "express";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    RootDBType,
    UserType
} from "src/types/types";
import {UserCreateModel} from "../users/model/UserCreateModel";
import {UserViewModel} from "../users/model/UserViewModel";
import {QueryUserModel} from "../users/model/QueryUserModel";
import {URIParamsUserIdModel} from "../users/model/URIParamsUserIdModel";
import {UserUpdateModel} from "../users/model/UserUpdateModel";
import {usersService} from "../../services/users-service";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {body} from "express-validator";
import {getUserViewModel} from "../../utils";
import {createUserValidationMiddleware} from "../../middlewares/createUserValidationMiddleware";

const titleValidation = body('userName').isLength({min: 3, max: 10}).withMessage('title should from 3 to 10 symbols')

// export const mapEntityToViewModel = (dbEntity: UserType): UserViewModel => ({
//     id: dbEntity.id,
//     login: dbEntity.userName
// })


export const getUsersRouter = (db: RootDBType) => {
    const router = express.Router()
    router.get('/', async (req: RequestWithQuery<QueryUserModel>, res: Response<UserViewModel[]>) => {
        let foundedUsers = await usersService.findUsers(req.query.userName) as any
        res.status(200).send(foundedUsers)
    })

    router.get('/:id', async (req: RequestWithParams<URIParamsUserIdModel>, res: Response<UserViewModel | number>) => {
        const user = await usersService.getUserById(req.params.id)
        if (user) {
            res.send(user)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

    router.post('/',createUserValidationMiddleware, inputValidationMiddleware, async (req: RequestWithBody<UserCreateModel>, res: Response<UserViewModel>) => {
        let data = req.body
        const user = await usersService.createUser(data)
        //@ts-ignore
        let out = getUserViewModel(user)
        res.status(HTTP_STATUSES.CREATED_201).send(out)
    })


    router.put('/:id',titleValidation, inputValidationMiddleware, async (req: RequestWithParamsAndBody<URIParamsUserIdModel, UserUpdateModel>, res: Response<UserViewModel | number>) => {
        const isUpdated = await usersService.updateUser(+req.params.id, req.body) as any
        if (isUpdated) {
            res.sendStatus(204)
            return
        } else {
            res.sendStatus(404)
            return
        }
    })

    router.delete('/:id', async (req: RequestWithParams<URIParamsUserIdModel>, res: Response<number>) => {
        const isDeleted = await usersService.deleteUser(+req.params.id) as any
        if (isDeleted) {
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })
    return router
}

