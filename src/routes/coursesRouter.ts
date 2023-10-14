import {Request, Response, Router} from "express";
import {CourseType} from "../types";
import { HTTP_STATUSES} from "../http_statuses/http_statuses";
import {db} from '../index'
export const coursesRouter = Router({})

coursesRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(db.courses)
})

coursesRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const course = db.courses.find((el:CourseType) => el.id === +id)
    if (course) {
        res.send(course)

    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

coursesRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title
    if (title) {
        const course = {id: +new Date(),title,studentsCount:0 }
        db.courses.push(course)
        res.status(HTTP_STATUSES.CREATED_201).send(course)
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})


coursesRouter.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const course = db.courses.find((el:CourseType) => el.id === +id)
    if (course) {
        course.title = req.body.title
        course.studentsCount = req.body.studentsCount
        res.status(HTTP_STATUSES.CREATED_201).send(course)
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})


coursesRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = db.courses.findIndex(el => el.id === +id)

    if (indexItem > -1) {
        db.courses.splice(indexItem, 1)
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})
