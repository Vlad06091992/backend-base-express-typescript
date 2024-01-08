import {UserType} from "../types";
import {client, usersCollection} from "../db-mongo";
import {getUserViewModel} from "../utils";
import {usersRepository} from "../repositories/users-repository";
import {UserCreateModel} from "../features/users/model/UserCreateModel";
import {UserUpdateModel} from "../features/users/model/UserUpdateModel";
import bcrypt from "bcrypt";
import {WithId} from "mongodb";


    export const usersService = { // data access layer
        findUsers(title: string | null) {
            return usersRepository.findUsers(title)
        },
        async createUser(user: UserCreateModel): Promise<UserType> {
          const{passwordHash,passwordSalt} = await this._generateHash(user.password)
            return   await usersRepository.createUser({...user,passwordHash,passwordSalt,createdAt:new Date().toISOString()})
        },
        async findUserByLoginOrEmail(emailOrLogin: string)  {
            let foundUser:WithId<UserType> | undefined = await usersRepository.findUserByLoginOrEmail(emailOrLogin)
            if(foundUser)  return getUserViewModel(foundUser)
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
        },
        async _generateHash(password:string) {
            const passwordSalt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password,passwordSalt)
            return{passwordSalt,passwordHash}
        }
    }
