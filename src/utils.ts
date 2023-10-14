import {CourseType} from "../src/types";
import {CourseViewModel} from "../src/models/CourseViewModel";

export const getCourseViewModel = (DBCourse: CourseType): CourseViewModel => ({title: DBCourse.title, id: DBCourse.id})