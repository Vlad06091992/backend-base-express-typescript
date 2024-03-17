import {UserType} from "../types/types";
import {client, usersCollection} from "../db-mongo";
import {getUserViewModel} from "../utils";
import {UserUpdateModel} from "../features/users/model/UserUpdateModel";
import {ObjectId, WithId} from "mongodb";
import {UserViewModel} from "../features/users/model/UserViewModel";

export const usersRepository = { // data access layer
    async findUsers(title: string | null) {
        let filter = {}
        if (title) {
            filter = {"title": {$regex: "title"}}
        }
        let result = await usersCollection.find(filter).toArray()
        debugger
        return result.map((el: any) => getUserViewModel(el))
    },
    async findUserByLoginOrEmail(emailOrLogin:string)  {
        let foundUser = await usersCollection.findOne({$or: [{"accountData.email": emailOrLogin}, {"accountData.userName": emailOrLogin}]})
        if(foundUser)  return foundUser
    },
    async findUserByConfirmationCode(emailConfirmationCode: string)  {
        let foundUser = await usersCollection.findOne({'emailConfirmation.confirmationCode':emailConfirmationCode})
        if(foundUser)  return foundUser
    },
    async createUser(user: UserType): Promise<WithId<UserType>> {
        const insertedUser = await usersCollection.insertOne(user)
        return {...user, _id:insertedUser.insertedId}
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

    async updateConfirmation(_id: object) {
        let result = await usersCollection.updateOne({_id}, {
            $set:  {'emailConfirmation.isConfirmed':true}
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

