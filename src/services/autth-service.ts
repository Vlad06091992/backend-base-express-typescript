import {UserCreateModel} from "../features/users/model/UserCreateModel";
import bcrypt from "bcrypt";
import {usersRepository} from "../repositories/users-repository";
import {UserType} from "../types/types";
import {usersService} from "../services/users-service";

import {v4 as uuidv4} from 'uuid';
import {emailManager} from "../managers/email-manager";
import {WithId} from "mongodb";
import {getUserViewModel} from "../utils";
import {UserViewModel} from "../features/users/model/UserViewModel";
import {add} from "date-fns";


export const authService = {
    async createUser({email, password, login}: UserCreateModel): Promise<UserViewModel | null> {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await usersService._generateHash(password, passwordSalt)
        const user = {
            accountData: {
                userName: login,
                email: email,
                passwordHash,
                // passwordSalt,
                createdAt: new Date().toISOString()
            }, emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30
                }),
                isConfirmed: false
            }
        };
        const createdResult: WithId<UserType> = await usersRepository.createUser(user)
        try {
            await emailManager.sendEmailConfirmationMessage(user)

        } catch (e) {
            console.log(e)
            return null
        }
        return getUserViewModel(createdResult)
    },
    async confirmEmail(code: string) {
        const user = await usersService.findUserByConfirmationCode(code)

        if (!user) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false
        return await usersRepository.updateConfirmation(user._id)
    }
}