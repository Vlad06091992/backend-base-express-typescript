import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {RootDBType} from "./types"
import {coursesRouter} from "./routes/coursesRouter";
import {usersRouter} from "./routes/users.router";


export const app = express()
app.use(bodyParser())
const port = process.env.port || 3000




export const db:RootDBType = {
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

app.use('/courses', coursesRouter)
app.use('/users', usersRouter)






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