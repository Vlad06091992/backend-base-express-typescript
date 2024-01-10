import {feadbackRepository} from "../repositories/comments-repository";

export const feadbackService = { // data access layer
    sendFeadback(comment:string,userId:string) {
        const feadBack = {comment,userId}
        return feadbackRepository.sendFeadback(feadBack)
    },
    getAllFeedbacks() {
        return feadbackRepository.getAllFeedbacks()
    },

}