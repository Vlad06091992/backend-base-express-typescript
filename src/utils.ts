import {CourseType, UserType} from "src/types/types";
import {CourseViewModel} from "./features/courses/model/CourseViewModel";
import {UserViewModel} from "./features/users/model/UserViewModel";
import {WithId} from "mongodb";

export const getCourseViewModel = (DBCourse: CourseType): CourseViewModel => ({
    title: DBCourse.title,
    id: DBCourse.id,
    studentsCount: DBCourse.studentsCount
})
export const getUserViewModel = (DBUser: WithId<UserType>): UserViewModel => ({ login: DBUser.login,email:DBUser.email,id:DBUser._id.toString()})