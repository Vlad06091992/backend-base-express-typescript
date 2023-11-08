import {getUsersCoursesBindingsRouter} from "./features/users-courses-bindings/users-courses-bindings.router"

import {getCoursesRouter} from "./features/courses/courses.router";
import {getUsersRouter} from "./features/users/users.router";
import express, {NextFunction, Request, Response} from "express";
import {db} from "./db";
import bodyParser from "body-parser";
import {coursesRepository} from "./repositories/courses-repository";

let countRequest = 0
let blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.blabla = 'hello'
    next()
};


let authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.sendStatus(401)
    }
};


let requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
    countRequest++
    next()
};


export const app = express()

export const Routes = {
    __test__: '/__test__',
    courses: '/courses',
    users: '/users',
    usersCoursesBindings: '/users-courses-bindings',
}

app.use(bodyParser())
// app.use(inputValidationMiddleware)
// app.use(authGuardMiddleware)
// app.use(requestCountMiddleware)
app.use(Routes.courses, getCoursesRouter(db))
app.use(Routes.users, getUsersRouter(db))
app.use(Routes.usersCoursesBindings, getUsersCoursesBindingsRouter(db))


app.get("/test", blablaMiddleware, (req: Request, res: Response) => {
    //@ts-ignore
    const blabla = req.blabla
    res.send({value: blabla, reqCounter: countRequest})

})

app.get("/user", (req: Request, res: Response) => {
    //@ts-ignore
    const blabla = req.blabla
    res.send({value: blabla + ' ' + 'from user', reqCounter: countRequest})
})

app.get('/counter', (req, res) => {
    res.send({count: countRequest})
})


app.delete("/__test__/data", async (req: Request, res: Response) => {
    db.usersCoursesBinding = []
    // db.courses = []
    db.users = []
    await coursesRepository.deleteAllCourses()
    res.sendStatus(204)
})

