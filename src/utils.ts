import {CourseType, UserType} from "../src/types";
import {CourseViewModel} from "./features/courses/model/CourseViewModel";
import {UserViewModel} from "./features/users/model/UserViewModel";

export const getCourseViewModel = (DBCourse: CourseType): CourseViewModel => ({
    title: DBCourse.title,
    id: DBCourse.id,
    studentsCount: DBCourse.studentsCount
})
export const getUserViewModel = (DBUser: UserType): UserViewModel => ({id: DBUser.id, userName: DBUser.userName})