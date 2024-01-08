import {checkSchema} from "express-validator";
import {usersService} from "../domain/users-service";

export const createUserValidationMiddleware = checkSchema({
    login: {
        isLength:{
            options:{
                min:3,
                max:20,
            },
            errorMessage:"incorrect password length(3-20)"
        },
        custom: {
            options: async (emailOrLogin: string) => {
                let res = await usersService.findUserByLoginOrEmail(emailOrLogin);
                if (res) {
                    return Promise.reject();
                }
            },
            errorMessage: "this user already exist",
        },
    },
    password: {
        isLength:{
            options:{
                min:3,
                max:20,
            },
            errorMessage:"incorrect password length(3-20"
        },
        matches:{
            options: /^(?=.*[A-Z])(?=.*\d).*$/,
            errorMessage:"The string lacks at least one uppercase letter or digit"

        }

    },
    email:{
        isEmail:true,
        errorMessage:"incorrect email",
        custom: {
            options: async (emailOrLogin: string) => {
                let res = await usersService.findUserByLoginOrEmail(emailOrLogin);
                if (res) {
                    return Promise.reject();
                }
            },
            errorMessage: "this user already exist",
        },
    }
});