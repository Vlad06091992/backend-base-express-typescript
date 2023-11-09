import {getCourseViewModel} from "../utils";
import {CourseType} from "../types";
import {client, productsCollection} from "../db-mongo";
import {CourseCreateModel} from "../features/courses/model/CourseCreateModel";




export const coursesRepository = {
    async findCourses(title: string | null) {
        let filter = {}
        if (title) {
            filter = {"title": {$regex: "title"}}
        }
        let result = await productsCollection.find(filter).toArray()
        return result.map((el: any) => getCourseViewModel(el))
    },
    async createCourse({title, studentsCount}: CourseCreateModel): Promise<CourseType> {
        const course = {id: +new Date(), title, studentsCount}
        await productsCollection.insertOne(course)
        return course
    },
    async getCourseById(id: number) {
        const course: CourseType | null = await productsCollection.findOne({id})
        if (course) {
            return (getCourseViewModel(course))
        }
        return null
    },
    async updateCourse({title, studentsCount}: { title: string, studentsCount: number }, id: number) {
        let result = await productsCollection.updateOne({id}, {
            $set: {
                title,
                studentsCount
            }
        })
        return result.matchedCount === 1
    },

    async deleteCourse(id: number) {
        let result = await productsCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async deleteAllCourses() {
        await client.db('institute').collection('courses').deleteMany({})
        return true
    }
}