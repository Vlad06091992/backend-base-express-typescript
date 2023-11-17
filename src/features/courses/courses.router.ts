import express, {Request, Response} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery, RootDBType} from "../../types";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {CourseCreateModel} from "../courses/model/CourseCreateModel";
import {QueryCourseModel} from "../courses/model/QueryCourseModel";
import {CourseUpdateModel} from "../courses/model/CourseUpdateModel";
import {CourseViewModel} from "../courses/model/CourseViewModel";
import {URIParamsCourseIdModel} from "../courses/model//URIParamsCourseIdModel";
import {getCourseViewModel} from "../../utils";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {coursesService} from "../../domain/courses-service";

const titleValidation = body('title').isLength({min: 3, max: 10}).withMessage('title should from 3 to 10 symbols')

export const getCoursesRouter = (db: RootDBType) => { //презентационный слой
    const router = express.Router()
    router.get('/', async (req: RequestWithQuery<QueryCourseModel>, res: Response<CourseViewModel[]>) => {
        let foundedCourses = await coursesService.findCourses(req.query.title) as any
        res.status(200).send(foundedCourses)
    })

    router.get('/:id', async (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel | number>) => {
        const course = await coursesService.getCourseById(+req.params.id)
        if (course) {
            res.send(course)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

    router.post('/', titleValidation, inputValidationMiddleware, async (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel | number | any>) => {
        let data = req.body
        const course = await coursesService.createCourse(data)
        let out = getCourseViewModel(course)
        res.status(HTTP_STATUSES.CREATED_201).send(out)
    })


    router.put('/:id', titleValidation, inputValidationMiddleware, async (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateModel>, res: Response<CourseViewModel | any>) => {
        const isUpdated = await coursesService.updateCourse(+req.params.id, req.body) as any
        if (isUpdated) {
            res.sendStatus(204)
            return
        } else {
            res.sendStatus(404)
            return
        }
    })


    router.delete('/:id', async (req: Request<URIParamsCourseIdModel>, res: Response<number>) => {
        const isDeleted = await coursesService.deleteCourse(+req.params.id) as any
        if (isDeleted) {
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })
    return router
}



