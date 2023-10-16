import {CourseType} from "../src/types";
import {CourseViewModel} from "./features/courses/model/CourseViewModel";

export const getCourseViewModel = (DBCourse: CourseType): CourseViewModel => ({title: DBCourse.title, id: DBCourse.id})