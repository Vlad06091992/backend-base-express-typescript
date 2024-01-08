import {UserType} from "../types";
import {client, usersCollection} from "../db-mongo";
import {getUserViewModel} from "../utils";
import {usersRepository} from "../repositories/users-repository";
import {UserCreateModel} from "../features/users/model/UserCreateModel";
import {UserUpdateModel} from "../features/users/model/UserUpdateModel";

    export const usersService = { // data access layer
        findUsers(title: string | null) {
            return usersRepository.findUsers(title)
        },
        async createUser(user: UserCreateModel): Promise<UserType> {
            const createdUser = await usersRepository.createUser(user)
            debugger
            return createdUser
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
            await client.db('test-mongo-docker').collection('users').deleteMany({})
            return true
        }
    }
