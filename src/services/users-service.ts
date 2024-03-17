import {UserType} from "../types/types";
import {client, usersCollection} from "../db-mongo";
import {usersRepository} from "../repositories/users-repository";
import {UserUpdateModel} from "../features/users/model/UserUpdateModel";
import bcrypt from "bcrypt";
import {WithId} from "mongodb";


export const usersService = { // data access layer
    findUsers(title: string | null) {
        return usersRepository.findUsers(title)
    },
    async findUserByLoginOrEmail(emailOrLogin: string) {
        let foundUser: WithId<UserType> | undefined = await usersRepository.findUserByLoginOrEmail(emailOrLogin)
        debugger
        if (foundUser) return foundUser
    },
    async findUserByConfirmationCode(code: string) {
        let foundUser: WithId<UserType> | undefined = await usersRepository.findUserByConfirmationCode(code)
        if (foundUser) return foundUser
    },
    getUserById(id: string) {
        return usersRepository.getUserById(id)
    },
    async updateUser(id: number, data: UserUpdateModel) {
        return usersRepository.updateUser(id, data)
    },

    async deleteUser(id: number) {
        let result = await usersCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async deleteAllUsers() {
        await usersCollection.deleteMany({})
        return true
    },
    async _generateHash(password: string, salt: string) {
        debugger
        const passwordHash = await bcrypt.hash(password, salt)
        return passwordHash
    },
    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await this.findUserByLoginOrEmail(loginOrEmail)
        if (!user) return false

        const isValidPassword = await bcrypt.compare(password, user.accountData.passwordHash)
        if (isValidPassword) {
            return user
        } else {
            return false
        }
    }

}
