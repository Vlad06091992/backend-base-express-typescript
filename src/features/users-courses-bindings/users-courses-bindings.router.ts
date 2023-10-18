import express, {Request, Response, Router} from "express";
import {CourseType, RequestWithBody, RootDBType, UsersCourseBindingType, UserType} from "../../types";
import {HTTP_STATUSES} from "../../../src/http_statuses/http_statuses";
import {
    UserCourseBindingsCreateModel
} from "../../../src/features/users-courses-bindings/model/UserCourseBindingsCreateModel";
import {
    UserCourseBindingsViewModel
} from "../../../src/features/users-courses-bindings/model/UserCourseBindingsViewModel";

const mapEntityToViewModel = (entity: UsersCourseBindingType, user: UserType, course: CourseType): UserCourseBindingsViewModel => {
    return {userId:entity.userId,courseId:entity.courseId, courseTitle: course.title, userName: user.userName}
}


export const getUsersCoursesBindingsRouter = (db: RootDBType) => {
    const router = express.Router()
    router.get('/', (req, res) => {

        let usersBindningsCourses = db.usersCoursesBinding

        res
            .status(HTTP_STATUSES.OK_200)
            .send(usersBindningsCourses)
    })

    router.post('/', (req: RequestWithBody<UserCourseBindingsCreateModel>, res: Response<UserCourseBindingsViewModel | number>) => {


        const user = db.users.find(el => el.id === req.body.userId)
        const course = db.courses.find(el => el.id === req.body.courseId)
        const alreadyExistingBinding = db.usersCoursesBinding.find(el => el.userId === user?.id && el.courseId === course?.id)

        if (!user || !course || !!alreadyExistingBinding) {
            res.send(HTTP_STATUSES.BAD_REQUEST_400)
            return
        } else {
            let createdEntity: UsersCourseBindingType = {...req.body, date: new Date()}
            // let createdEntity: UsersCourseBindingType = {...req.body, date: new Date()}
            db.usersCoursesBinding.push(createdEntity)
            res
                .status(HTTP_STATUSES.CREATED_201)
                .send(mapEntityToViewModel(createdEntity, user, course))
            return;
        }


    })
    return router
}