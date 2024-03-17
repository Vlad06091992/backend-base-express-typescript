import {CourseType, UserType} from "./types/types";
import {CourseViewModel} from "./features/courses/model/CourseViewModel";
import {UserViewModel} from "./features/users/model/UserViewModel";
import {WithId} from "mongodb";

export const getCourseViewModel = (DBCourse: CourseType): CourseViewModel => ({
    title: DBCourse.title,
    id: DBCourse.id,
    studentsCount: DBCourse.studentsCount
})
export const getUserViewModel = (DBUser: UserType, id?:string) => <UserViewModel>(
    {
        login: DBUser.accountData.userName,
        email: DBUser.accountData.email,
        id: DBUser._id ? DBUser._id.toString() : id,
        createdAt:DBUser.accountData.createdAt
    })