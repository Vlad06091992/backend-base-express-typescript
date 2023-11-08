import {getCourseViewModel} from "../utils";
import {CourseType} from "../types";
import {client} from "../db-mongo";
import {CourseCreateModel} from "../features/courses/model/CourseCreateModel";
import {CourseViewModel} from "../features/courses/model/CourseViewModel";

export const coursesRepository = {
    async findCourses(title: string | null) {
        if (title) {
            let result = await client.db('institute').collection('courses').find({"title": {$regex: "title"}}).toArray()
            return result.map((el:any) => getCourseViewModel(el))
        }
        let result = await client.db('institute').collection('courses').find().toArray()
        return result.map((el:any) => getCourseViewModel(el))
    },
    async createCourse({title, studentsCount}: CourseCreateModel): Promise<CourseType> {
        const course = {id: +new Date(), title, studentsCount}
        await client.db('institute').collection('courses').insertOne(course)
        return course
    },
    async getCourseById(id: number) {
        const course: CourseType | null = await client.db('institute').collection<CourseType>('courses').findOne({id})
        if (course) {
            return (getCourseViewModel(course))
        }
        return null
    },
    async updateCourse({title, studentsCount}: { title: string, studentsCount: number }, id: number) {
        let result = await client.db('institute').collection('courses').updateOne({id}, {
            $set: {
                title,
                studentsCount
            }
        })
        return result.matchedCount === 1
    },

    async deleteCourse(id: number) {
        let result = await client.db('institute').collection('courses').deleteOne({id})
        return result.deletedCount === 1
    },
    async deleteAllCourses() {
        await client.db('institute').collection('courses').deleteMany({})
        return true
    }
}