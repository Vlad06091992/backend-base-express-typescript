import express, {Request, Response, Router} from "express";
import {
    CourseType,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    RootDBType
} from "../../types";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";
import {CourseCreateModel} from "../courses/model/CourseCreateModel";
import {QueryCourseModel} from "../courses/model/QueryCourseModel";
import {CourseUpdateModel} from "../courses/model/CourseUpdateModel";
import {CourseViewModel} from "../courses/model/CourseViewModel";
import {URIParamsCourseIdModel} from "../courses/model//URIParamsCourseIdModel";
import {getCourseViewModel} from "../../utils";
import {coursesRepository} from "../../repositories/courses-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";

const titleValidation = body('title').isLength({min: 3, max: 10}).withMessage('title should from 3 to 10 symbols')

export const getCoursesRouter = (db: RootDBType) => {
    const router = express.Router()
    router.get('/', async (req: RequestWithQuery<QueryCourseModel>, res: Response<CourseViewModel[]>) => {
        let foundedCourses = await coursesRepository.findCourses(req.query.title) as any
        res.status(200).send(foundedCourses)
    })

    router.get('/:id', async (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel | number>) => {
        const course = await coursesRepository.getCourseById(+req.params.id)
        if (course) {
            res.send(course)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })

    router.post('/', titleValidation, inputValidationMiddleware, async (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel | number | any>) => {
        let data = req.body
        const course = await coursesRepository.createCourse(data) as any
        let out = getCourseViewModel(course)
        res.status(HTTP_STATUSES.CREATED_201).send(out)
    })


    router.put('/:id', titleValidation, async (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateModel>, res: Response<CourseViewModel | any>) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const isUpdated = await coursesRepository.updateCourse(req.body, +req.params.id) as any
            if (isUpdated) {
                res.sendStatus(204)
                return
            } else {
                res.sendStatus(404)
                return
            }
        }
        res.send({errors: result.array()});
    })


    router.delete('/:id', async (req: Request<URIParamsCourseIdModel>, res: Response<number>) => {
        const isDeleted = await coursesRepository.deleteCourse(+req.params.id) as any
        if (isDeleted) {
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })
    return router
}



