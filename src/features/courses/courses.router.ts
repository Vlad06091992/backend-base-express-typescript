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
        let foundedCourses = await coursesRepository.findCourses(req.query.title)
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

    // router.post('/', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel | number>) => {
    //     let title = req.body.title
    //     if (title) {
    //         const course = coursesRepository.createCourse(title)
    //         res.status(HTTP_STATUSES.CREATED_201).send(getCourseViewModel(course))
    //     } else {
    //         res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    //     }
    // })

    router.post('/', titleValidation, inputValidationMiddleware, async (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel | number | any>) => {
        debugger
        let title = req.body.title
        const course = await coursesRepository.createCourse(title)
        res.status(HTTP_STATUSES.CREATED_201).send(getCourseViewModel(course))
        // body('title').isLength({min: 3, max: 10})

        // const result = validationResult(req);
        // if (result.isEmpty()) {
        //     const course = coursesRepository.createCourse(title)
        //     res.status(HTTP_STATUSES.CREATED_201).send(getCourseViewModel(course))
        // }

        // res.send({errors: result.array()});


        // if(!title.trim()){
        //     res.sendStatus(400)
        // }
        // const course = coursesRepository.createCourse(title)
        // res.status(HTTP_STATUSES.CREATED_201).send(getCourseViewModel(course))
    })


    router.put('/:id', titleValidation, async (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateModel>, res: Response<CourseViewModel | any>) => {

        const result = validationResult(req);
        if (result.isEmpty()) {
            const isUpdated = await coursesRepository.updateCourse(req.body, +req.params.id)
            if (isUpdated) {
                res.send(coursesRepository.getCourseById(+req.params.id))
            } else {
                res.sendStatus(404)
            }
        }
        res.send({errors: result.array()});


    })


    // router.put('/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateModel>, res: Response<CourseViewModel>) => {
    //     const isUpdated = coursesRepository.updateCourse(req.body, +req.params.id)
    //     if (isUpdated) {
    //         res.send(coursesRepository.getCourseById(+req.params.id))
    //     } else {
    //         res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    //     }
    // })


    router.delete('/:id', async (req: Request<URIParamsCourseIdModel>, res: Response<number>) => {
        const isDeleted = await coursesRepository.deleteCourse(+req.params.id)
        if (isDeleted) {
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
    })
    return router
}



