import {getCourseViewModel} from "../utils";
import {CommentType, CourseType} from "src/types/types";
import {client, feadbackCollection, coursesCollection} from "../db-mongo";

export const feadbackRepository = { // data access layer
    async sendFeadback(comment: CommentType): Promise<CommentType> {
        await feadbackCollection.insertOne(comment)
        return comment
    },
    async getAllFeedbacks(): Promise<CommentType[]> {
        return await feadbackCollection.find({}).toArray()

    },
}