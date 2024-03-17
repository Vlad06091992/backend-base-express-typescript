import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'
import {CommentType, CourseType, UserType} from "./types/types";

dotenv.config()

// const URL= process.env.MONGO_URL
const URL= 'mongodb://localhost:27017'

console.log(URL)

if(!URL){
    throw new Error("URL not found")
}

export const client = new MongoClient(URL)

// const dbName = 'test-mongo-docker';
const dbName = 'test-mongo-docker-many-courses';
export const db = client.db(dbName);
// const db = client.db();
export const coursesCollection = db.collection<CourseType>('courses');
export const usersCollection = db.collection<UserType>('users');

console.log(usersCollection.find().toArray().then((res)=>{
    console.log(res)}))
export const feadbackCollection = db.collection<CommentType>('comments');

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