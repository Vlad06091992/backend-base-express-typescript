import {CourseType} from "../src/types";
import {CourseViewModel} from "../src/models/courses/CourseViewModel";

export const getCourseViewModel = (DBCourse: CourseType): CourseViewModel => ({title: DBCourse.title, id: DBCourse.id})