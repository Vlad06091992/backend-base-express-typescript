import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'
import {CourseType} from "./types";

dotenv.config()

// const URL= process.env.MONGO_URL
const URL= 'mongodb://localhost:27017'

console.log(URL)

if(!URL){
    throw new Error("URL not found")
}

export const client = new MongoClient(URL)

const dbName = 'test-mongo-docker';
export const db = client.db(dbName);
// const db = client.db();
export const coursesCollection = db.collection<CourseType>('courses');

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