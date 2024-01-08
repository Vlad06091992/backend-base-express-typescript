import {UserType} from "../types";
import {client, usersCollection} from "../db-mongo";
import {getUserViewModel} from "../utils";
import {UserUpdateModel} from "../features/users/model/UserUpdateModel";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt"
import {UserCreateModel} from "../features/users/model/UserCreateModel";

export const usersRepository = { // data access layer
    async findUsers(title: string | null) {
        let filter = {}
        if (title) {
            filter = {"title": {$regex: "title"}}
        }
        let result = await usersCollection.find(filter).toArray()
        return result.map((el: any) => getUserViewModel(el))
    },
    async findUserByEmail(email: string | null):Promise<any>  {
        let filter = {}
        if (email) {
            filter = {"email": {$regex: "email"}}
        }
        let findedUser = await usersCollection.findOne(filter)
        if(findedUser)  return getUserViewModel(findedUser)
    },
    async createUser(user: UserCreateModel): Promise<UserType> {

        await usersCollection.insertOne(user)
        return user
    },
    async getUserById(id: string) {
        const user = await usersCollection.findOne({_id: new ObjectId(id)})
        if (user) {
            return (getUserViewModel(user))
        }
        return null
    },
    async updateUser(id: number, data: UserUpdateModel) {
        let result = await usersCollection.updateOne({id}, {
            $set: data
        })
        return result.matchedCount === 1
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

