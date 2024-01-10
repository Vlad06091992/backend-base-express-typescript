import {CourseType} from "src/types/types";
import {CourseCreateModel} from "../features/courses/model/CourseCreateModel";
import {coursesRepository} from "../repositories/courses-repository";
import {CourseUpdateModel} from "../features/courses/model/CourseUpdateModel";


class Course {
    id: number
    title: string
    studentsCount: number

    constructor(title: string, studentsCount: number) {
        this.id = +new Date()
        this.title = title
        this.studentsCount = studentsCount
    }
}

export const coursesService = { //business(application) layer
     findCourses(title: string | null) {
        return coursesRepository.findCourses(title)
    },
     createCourse({title, studentsCount}: CourseCreateModel): Promise<CourseType> {
        const course = new Course(title, studentsCount)
        return coursesRepository.createCourse(course)
    },
     getCourseById(id: number) {
        return coursesRepository.getCourseById(id)
    },
     updateCourse(id: number, courseUpdateData: CourseUpdateModel) {
        return coursesRepository.updateCourse(id, courseUpdateData)
    },

     deleteCourse(id: number) {
        return coursesRepository.deleteCourse(id)
    },
    deleteAllCourses() {
        return  coursesRepository.deleteAllCourses()
    }
}