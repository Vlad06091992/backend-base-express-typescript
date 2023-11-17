import {getCourseViewModel} from "../utils";
import {CourseType} from "../types";
import {client, coursesCollection} from "../db-mongo";
import {CourseCreateModel} from "../features/courses/model/CourseCreateModel";

export const coursesRepository = { // data access layer
    async findCourses(title: string | null) {
        let filter = {}
        if (title) {
            filter = {"title": {$regex: "title"}}
        }
        let result = await coursesCollection.find(filter).toArray()
        return result.map((el: any) => getCourseViewModel(el))
    },
    async createCourse(course: CourseType): Promise<CourseType> {
        await coursesCollection.insertOne(course)
        return course
    },
    async getCourseById(id: number) {
        const course: CourseType | null = await coursesCollection.findOne({id})
        if (course) {
            return (getCourseViewModel(course))
        }
        return null
    },
    async updateCourse(id: number, {title, studentsCount}: { title: string, studentsCount: number }) {
        let result = await coursesCollection.updateOne({id}, {
            $set: {
                title,
                studentsCount
            }
        })
        return result.matchedCount === 1
    },

    async deleteCourse(id: number) {
        let result = await coursesCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async deleteAllCourses() {
        await client.db('test-mongo-docker').collection('courses').deleteMany({})
        return true
    }
}