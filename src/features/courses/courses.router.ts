import express, {Request, Response, Router} from "express";
import {
    CourseType,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    RootDBType
} from "../../types";
import {HTTP_STATUSES} from "../../../src/http_statuses/http_statuses";
import {CourseCreateModel} from "../courses/model/CourseCreateModel";
import {QueryCourseModel} from "../courses/model/QueryCourseModel";
import {CourseUpdateModel} from "../courses/model/CourseUpdateModel";
import {CourseViewModel} from "../courses/model/CourseViewModel";
import {URIParamsCourseIdModel} from "../courses/model//URIParamsCourseIdModel";
import {getCourseViewModel} from "../../utils";

export const coursesRouter = Router({})
export const getCoursesRouter = (db:RootDBType) => {
    const router = express.Router()

    router.get('/', (req: RequestWithQuery<QueryCourseModel>, res: Response<CourseViewModel[]>) => {

        let foundedCourses = db.courses

        if (req.query.title) {
            foundedCourses = foundedCourses.filter(el => el.title.indexOf(req.query.title) > -1)
        }
        res.status(200).send(foundedCourses.map(el=>(getCourseViewModel(el))))
    })

    router.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel | number>) => {
        const id = req.params.id
        const course = db.courses.find((el: CourseType) => el.id === +id)
        if (course) {
            res.send(getCourseViewModel(course))

        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

    router.post('/', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel | number>) => {
        let title = req.body.title
        if (title) {
            const course = {id: +new Date(), title, studentsCount: 0}
            db.courses.push(course)
            res.status(HTTP_STATUSES.CREATED_201).send(getCourseViewModel(course))
        } else {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }
    })


    router.put('/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateModel>, res: Response<CourseViewModel>) => {
        const id = req.params.id

        const course = db.courses.find((el: CourseType) => el.id === +id)
        if (course) {
            course.title = req.body.title
            course.studentsCount = req.body.studentsCount
            res.status(HTTP_STATUSES.CREATED_201).send(getCourseViewModel(course))
        } else {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }
    })


    router.delete('/:id', (req: Request<URIParamsCourseIdModel>, res: Response<number>) => {
        const id = req.params.id
        const indexItem = db.courses.findIndex(el => el.id === +id)

        if (indexItem > -1) {
            db.courses.splice(indexItem, 1)
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

    return router

}



