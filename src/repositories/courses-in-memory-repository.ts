import {db} from "../db";
import {getCourseViewModel} from "../utils";
import {CourseType} from "../types";

export const coursesRepository = {
    async findCourses(title: string | null) {
        let foundedCourses = db.courses

        if (title) {
            foundedCourses = foundedCourses.filter(el => el.title.indexOf(title) > -1)
        }
        return foundedCourses.map(el => (getCourseViewModel(el)))
    },
    async createCourse(title: string): Promise<CourseType> {
        const course = {id: +new Date(), title, studentsCount: 0}
        db.courses.push(course)

        return course


    },
    async getCourseById(id: number) {
        const course = db.courses.find((el: CourseType) => el.id === id)
        if (course) {
            return (getCourseViewModel(course))

        }
    },
    async updateCourse(body: { title: string, studentsCount: number }, id: number) {
        const course = db.courses.find((el: CourseType) => el.id === +id)
        if (course) {
            course.title = body.title
            course.studentsCount = body.studentsCount
            return true
        } else {
            return false
        }
    },
    async deleteCourse(id: number) {
        const indexItem = db.courses.findIndex(el => el.id === +id)
        if (indexItem > -1) {
            db.courses.splice(indexItem, 1)
            return true
        } else {
            return false
        }
    }
}