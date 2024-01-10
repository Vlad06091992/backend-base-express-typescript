import {NextFunction, Request, Response} from "express";
import {Result, validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors:Result = validationResult(req);
    console.log(errors)
    if (errors.isEmpty()) {
        next()
    } else {
        res.status(400).send({errors: errors.array().map((el) =>({field:el.path,message:el.msg}))});
    }
};