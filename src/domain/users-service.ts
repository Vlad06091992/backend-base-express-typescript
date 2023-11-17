import {UserType} from "../types";
import {client, usersCollection} from "../db-mongo";
import {getUserViewModel} from "../utils";
import {usersRepository} from "../repositories/users-repository";
import {UserCreateModel} from "../features/users/model/UserCreateModel";
import {UserUpdateModel} from "../features/users/model/UserUpdateModel";

class User {
    userName: string
    id: number

    constructor(userName: string) {
        this.userName = userName,
            this.id = +new Date()
    }}

    export const usersService = { // data access layer
        findUsers(title: string | null) {
            return usersRepository.findUsers(title)
        },
        createUser({userName}: UserCreateModel): Promise<UserType> {
            const user = new User(userName)
            return usersRepository.createUser(user)
        },
        getUserById(id: number) {
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
