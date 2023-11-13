import dotenv from 'dotenv'

import {MongoClient} from 'mongodb'
import {CourseType} from "./types";


dotenv.config()


const URL= process.env.MONGO_URL

if(!URL){
    throw new Error("URL not found")
}

export const client = new MongoClient(URL)

const db = client.db('base-backend');
export const productsCollection = db.collection<CourseType>('courses');

export async function runDb() {
    try {
//Connect client to the server
        await client.connect()
        //Establish ane verify connection
        await client.db('courses').command({ping: 1})
        console.log('Connected successfully to mongo server')
    } catch {
//Ensures that the client will close when your finish/error
        console.log(`can't connect to db`)

        await client.close()
    }
}