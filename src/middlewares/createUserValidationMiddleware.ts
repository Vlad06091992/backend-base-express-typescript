import {NextFunction, Request, Response} from "express";
import {body, check, checkSchema, CustomValidator, validationResult} from "express-validator";
import {MinMaxOptions} from "express-validator/src/options";

export const createUserValidationMiddleware = checkSchema({
    login: {
        isLength:{
            options:{
                min:3,
                max:20,
            },
            errorMessage:"incorrect password length(3-20)"
        },
        matches:{
            options: /^(?=.*[A-Z])(?=.*\d).*$/,
            errorMessage:"The string lacks at least one uppercase letter or digit"

        }
        //     custom:((value:string) => {
    // return User.findUserByEmail(value).then(user => {
    //     if (user) {
    //         return Promise.reject('E-mail already in use');
    //     }
    // });
    // })
    },
    password: {
        isLength:{
            options:{
                min:3,
                max:20,
            },
            errorMessage:"incorrect password length(3-20"
        },

    },
    email:{
        isEmail:true,
        errorMessage:"incorrect email"
    }
});