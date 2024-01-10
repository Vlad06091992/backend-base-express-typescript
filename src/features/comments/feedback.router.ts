import express from "express";
import {feadbackService} from "../../services/feadback-service";
import {authMiddleware} from "../../middlewares/authMiddleware";


export const getFeedbackRouter = () => {
    const router = express.Router()
    router.post('/', authMiddleware, async (req: any, res) => {
        await feadbackService.sendFeadback(req.body.comment, req.user.id)
        debugger
        res.sendStatus(201)
    })

    router.get('/', async (req: any, res) => {
        let feedbacks = await feadbackService.getAllFeedbacks()
        res.status(200).send(feedbacks)
    })

    return router
}

