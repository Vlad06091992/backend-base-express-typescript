import express, {Response, Request} from 'express'
import bodyParser from "body-parser";
import {CourseType, RootDBType} from "./types"

type UserType = {

}

export const app = express()
app.use(bodyParser())
const port = process.env.port || 3000

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}


const db:RootDBType = {
    courses:
        [
            {id: 1, title: 'front-end',studentsCount:10},
            {id: 2, title: 'back-end',studentsCount:10},
            {id: 3, title: 'automation qa',studentsCount:10},
            {id: 4, title: 'devops',studentsCount:10}
        ],
    users: [{id: 1, userName: "Vlad"}, {id: 2, userName: "Daria"}],
    studentsCourseBinding:
        [
            {studentId: 1, courseId: 1, date: new Date(2022,10,1)},
            {studentId: 1, courseId: 2, date: new Date(2022,10,1)},
            {studentId: 2, courseId: 2, date: new Date(2022,10,1)}
        ]
}


app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(db.courses)
})

app.get('/courses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const course = db.courses.find((el:CourseType) => el.id === +id)
    if (course) {
        res.send(course)

    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.post('/courses', (req: Request, res: Response) => {
    let title = req.body.title
    if (title) {
        const course = {id: +new Date(),title,studentsCount:0 }
        db.courses.push(course)
        res.status(HTTP_STATUSES.CREATED_201).send(course)
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})


app.put('/courses/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const course = db.courses.find(el => el.id === +id)
    if (course) {
        course.title = req.body.title
        res.status(HTTP_STATUSES.CREATED_201).send(course)
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})


app.delete('/courses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = db.courses.findIndex(el => el.id === +id)

    if (indexItem > -1) {
        db.courses.splice(indexItem, 1)
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})
app.get('/users', (req: Request, res: Response) => {
    const title = req.query.title
    if (title) {
        if (typeof title === "string") {
            res.send(db.users.filter(el => el.userName.toLowerCase().indexOf(title) > -1))
        }
    }
    res.send(db.users)
})

app.post('/users', (req: Request, res: Response) => {
    const userName = req.body.title
    res.send(userName)
})


app.get('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const user = db.users.find(el => el.id === +id)
    if (user) {
        res.send(user)

    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = db.users.findIndex(el => el.id === +id)

    if (indexItem > -1) {
        db.users.splice(indexItem, 1)
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

console.log(new Date(2022,10,1))



// app.get('/students', (req: Request, res: Response) => {
//     let title = req.query.title
//
//     if (req.query.title) {
//         let searchString = req.query.title.toString()
//         let filteredStudents = db.studentsCourseBinding.filter(el => el.title.indexOf(searchString) > -1)
//         res.send(filteredStudents)
//     } else {
//         res.send(db.studentsCourseBinding)
//     }
// })
// app.post('/students', (req: Request, res: Response) => {
//     let title = req.body.title
//
//     const student = {id: +new Date(), title}
//     db.studentsCourseBinding.push(student)
//     res.status(HTTP_STATUSES.CREATED_201).send(student)
//
// })
// app.put('/students/:id', (req: Request, res: Response) => {
//     const id = req.params.id
//
//     const student = db.studentsCourseBinding.find(el => el.id === +id)
//     if (student) {
//         student.title = req.body.title
//         res.status(HTTP_STATUSES.CREATED_201).send(student)
//     }
// })
//
// app.get('/students/:productTitle', (req: Request, res: Response) => {
//     const studentTitle = req.params.productTitle
//     const student = db.studentsCourseBinding.find(el => el.title === studentTitle)
//
//     if (student) {
//         res.send(student)
//
//     } else {
//         res.send(HTTP_STATUSES.NOT_FOUND_404)
//     }
// })
//

app.delete("/__test__/data", (req: Request, res: Response) => {
    db.courses = []
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})