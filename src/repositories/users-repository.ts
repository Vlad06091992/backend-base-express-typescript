import {UserType} from "../types";
import {client, usersCollection} from "../db-mongo";
import {getUserViewModel} from "../utils";
import {UserUpdateModel} from "../features/users/model/UserUpdateModel";
import {ObjectId} from "mongodb";
import {UserViewModel} from "../features/users/model/UserViewModel";

export const usersRepository = { // data access layer
    async findUsers(title: string | null) {
        let filter = {}
        if (title) {
            filter = {"title": {$regex: "title"}}
        }
        let result = await usersCollection.find(filter).toArray()
        return result.map((el: any) => getUserViewModel(el))
    },
    async findUserByLoginOrEmail(emailOrLogin:string)  {
        let foundUser = await usersCollection.findOne({$or: [{email: emailOrLogin}, {login: emailOrLogin}]})
        console.log(foundUser)
        debugger

        if(foundUser)  return foundUser
    },
    async createUser(user: UserType): Promise<UserType> {
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

