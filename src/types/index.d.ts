import {Request} from "express";
import {UserViewModel} from "src/features/users/model/UserViewModel";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserViewModel | null
        }
    }
}