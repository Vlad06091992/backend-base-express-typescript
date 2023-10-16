import {getCoursesRouter} from "../src/features/courses/courses.router";
import {getUsersRouter} from "../src/features/users/users.router";
import express, {Request, Response} from "express";
import {db} from "./db";
import bodyParser from "body-parser";

export const app = express()

export const Routes = {
    __test__ : '/__test__',
    courses:'/courses',
    users:'/users',
    usersCoursesBindings:'/users-courses-bindings',
}

app.use(bodyParser())
app.use(Routes.courses, getCoursesRouter(db))
app.use(Routes.users, getUsersRouter(db))

app.delete("/__test__/data", (req: Request, res: Response) => {
    db.courses = []
    db.users = []
    db.studentsCourseBinding = []
    res.sendStatus(204)
})