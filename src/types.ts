import {Request, Response, Router} from "express";

export type CourseType = {
    id: number;
    title: string;
    studentsCount: number;
}

export type UserType = {
    id: number;
    userName: string;
}

export type StudentsCourseBindingType = {
    studentId: number;
    courseId: number;
    date: Date;
}

export type RootDBType = {
    courses: CourseType[];
    users: UserType[];
    studentsCourseBinding: StudentsCourseBindingType[];
}
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithBody<T> = Request<{}, {}, T, {}>
export type RequestWithParams<T> = Request<T, {}, {}, {}>
export type RequestWithParamsAndBody<T,D> = Request<T, {}, D, {}>