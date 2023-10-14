import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {coursesRouter} from "./routes/coursesRouter";
import {usersRouter} from "./routes/users.router";
import {db} from "./db";


export const app = express()
app.use(bodyParser())
const port = process.env.port || 3000






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
    db.users = []
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})