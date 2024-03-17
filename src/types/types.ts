import {Request, Response, Router} from "express";


export type CourseType = {
    title: string;
    studentsCount: number;
}

export type CommentType = {
    userId: string;
    comment: string;
}


export type UserType = {
    _id?:object
    accountData:{
        userName: string;
        email:string;
        passwordHash:string
        // passwordSalt:string
        createdAt:string
    }
    emailConfirmation:{
        confirmationCode: string,
        expirationDate:Date,
        isConfirmed:boolean
    }
}

export type UsersCourseBindingType = {
    userId: number;
    courseId: number;
    date: Date;

}

export type RootDBType = {
    courses: CourseType[];
    users: UserType[];
    usersCoursesBinding: UsersCourseBindingType[];
}
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithBody<T> = Request<{}, {}, T, {}>
export type RequestWithParams<T> = Request<T, {}, {}, {}>
export type RequestWithParamsAndBody<T,D> = Request<T, {}, D, {}>