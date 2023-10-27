import {getUsersCoursesBindingsRouter} from "./features/users-courses-bindings/users-courses-bindings.router"

import {getCoursesRouter} from "./features/courses/courses.router";
import {getUsersRouter} from "./features/users/users.router";
import express, {Request, Response} from "express";
import {db} from "./db";
import bodyParser from "body-parser";

export const app = express()

export const Routes = {
    __test__: '/__test__',
    courses: '/courses',
    users: '/users',
    usersCoursesBindings: '/users-courses-bindings',
}

app.use(bodyParser())
app.use(Routes.courses, getCoursesRouter(db))
app.use(Routes.users, getUsersRouter(db))
app.use(Routes.usersCoursesBindings, getUsersCoursesBindingsRouter(db))

app.delete("/__test__/data", (req: Request, res: Response) => {
    db.usersCoursesBinding = []
    db.courses = []
    db.users = []
    res.sendStatus(204)
})