import {getUsersCoursesBindingsRouter} from "./features/users-courses-bindings/users-courses-bindings.router"

import {getCoursesRouter} from "./features/courses/courses.router";
import {getUsersRouter} from "./features/users/users.router";
import express, {NextFunction, Request, Response} from "express";
import {db} from "./db";
import bodyParser from "body-parser";
import {coursesService} from "./domain/courses-service";
import {usersService} from "./domain/users-service";

//TODO - сортировка

let countRequest = 0
let blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.blabla = 'hello'
    next()
};


let authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.sendStatus(401)
    }
};


let requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
    countRequest++
    next()
};


export const app = express()

export const Routes = {
    __test__: '/__test__',
    courses: '/courses',
    users: '/users',
    usersCoursesBindings: '/users-courses-bindings',
}

app.use(bodyParser())
// app.use(inputValidationMiddleware)
// app.use(authGuardMiddleware)
// app.use(requestCountMiddleware)
app.use(Routes.courses, getCoursesRouter(db))
app.use(Routes.users, getUsersRouter(db))
app.use(Routes.usersCoursesBindings, getUsersCoursesBindingsRouter(db))


app.get("/test", blablaMiddleware, (req: Request, res: Response) => {
    //@ts-ignore
    const blabla = req.blabla
    res.send({value: blabla, reqCounter: countRequest})

})


app.get("/", (req: Request, res: Response) => {
    debugger
    res.send(`hello, it's my training backend project :)` )
})

app.get("/user", (req: Request, res: Response) => {
    //@ts-ignore
    const blabla = req.blabla
    res.send({value: blabla + ' ' + 'from user', reqCounter: countRequest})
})

app.get('/counter', (req, res) => {
    res.send({count: countRequest})
})


app.delete("/__test__/data", async (req: Request, res: Response) => {
    db.usersCoursesBinding = []
    // db.courses = []
    db.users = []

    await coursesService.deleteAllCourses()
    await usersService.deleteAllUsers()
    res.sendStatus(204)
})

// const courses = [ //template for pagination
//     {
//         "title": "angular",
//         "studentsCount": 5344
//     },
//     {
//         "title": "angular",
//         "studentsCount": 5949
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 5922
//     },
//     {
//         "title": "angular",
//         "studentsCount": 4526
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 4289
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 3863
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 4113
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 5788
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 3800
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 3664
//     },
//     {
//         "title": "react",
//         "studentsCount": 4846
//     },
//     {
//         "title": "docker",
//         "studentsCount": 1391
//     },
//     {
//         "title": "docker",
//         "studentsCount": 4316
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 5504
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 4300
//     },
//     {
//         "title": "angular",
//         "studentsCount": 1138
//     },
//     {
//         "title": "angular",
//         "studentsCount": 4564
//     },
//     {
//         "title": "docker",
//         "studentsCount": 1714
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 3472
//     },
//     {
//         "title": "docker",
//         "studentsCount": 5257
//     },
//     {
//         "title": "docker",
//         "studentsCount": 5186
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 5956
//     },
//     {
//         "title": "docker",
//         "studentsCount": 4948
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 1636
//     },
//     {
//         "title": "docker",
//         "studentsCount": 5650
//     },
//     {
//         "title": "angular",
//         "studentsCount": 4521
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 2565
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 3475
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 5027
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 2404
//     },
//     {
//         "title": "angular",
//         "studentsCount": 3020
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 2425
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 2673
//     },
//     {
//         "title": "angular",
//         "studentsCount": 1880
//     },
//     {
//         "title": "angular",
//         "studentsCount": 3208
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 4924
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 2844
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 5545
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 2711
//     },
//     {
//         "title": "docker",
//         "studentsCount": 2690
//     },
//     {
//         "title": "angular",
//         "studentsCount": 2750
//     },
//     {
//         "title": "docker",
//         "studentsCount": 3048
//     },
//     {
//         "title": "docker",
//         "studentsCount": 1328
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 4665
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 3249
//     },
//     {
//         "title": "react",
//         "studentsCount": 4376
//     },
//     {
//         "title": "docker",
//         "studentsCount": 2822
//     },
//     {
//         "title": "angular",
//         "studentsCount": 1806
//     },
//     {
//         "title": "docker",
//         "studentsCount": 5122
//     },
//     {
//         "title": "angular",
//         "studentsCount": 5338
//     },
//     {
//         "title": "angular",
//         "studentsCount": 3968
//     },
//     {
//         "title": "angular",
//         "studentsCount": 3289
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 2062
//     },
//     {
//         "title": "react",
//         "studentsCount": 1169
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 2794
//     },
//     {
//         "title": "react",
//         "studentsCount": 4974
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 1691
//     },
//     {
//         "title": "docker",
//         "studentsCount": 2962
//     },
//     {
//         "title": "react",
//         "studentsCount": 2238
//     },
//     {
//         "title": "angular",
//         "studentsCount": 3251
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 3426
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 3977
//     },
//     {
//         "title": "react",
//         "studentsCount": 1483
//     },
//     {
//         "title": "angular",
//         "studentsCount": 3820
//     },
//     {
//         "title": "docker",
//         "studentsCount": 4320
//     },
//     {
//         "title": "angular",
//         "studentsCount": 5332
//     },
//     {
//         "title": "react",
//         "studentsCount": 3725
//     },
//     {
//         "title": "angular",
//         "studentsCount": 1817
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 1628
//     },
//     {
//         "title": "docker",
//         "studentsCount": 1504
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 4693
//     },
//     {
//         "title": "docker",
//         "studentsCount": 2883
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 3961
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 2222
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 1059
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 5423
//     },
//     {
//         "title": "angular",
//         "studentsCount": 2672
//     },
//     {
//         "title": "react",
//         "studentsCount": 1988
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 1410
//     },
//     {
//         "title": "react",
//         "studentsCount": 1877
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 4551
//     },
//     {
//         "title": "docker",
//         "studentsCount": 3560
//     },
//     {
//         "title": "react",
//         "studentsCount": 2004
//     },
//     {
//         "title": "react",
//         "studentsCount": 3974
//     },
//     {
//         "title": "angular",
//         "studentsCount": 1745
//     },
//     {
//         "title": "angular",
//         "studentsCount": 2359
//     },
//     {
//         "title": "angular",
//         "studentsCount": 1521
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 4308
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 2426
//     },
//     {
//         "title": "angular",
//         "studentsCount": 5174
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 1304
//     },
//     {
//         "title": "react",
//         "studentsCount": 2494
//     },
//     {
//         "title": "docker",
//         "studentsCount": 1313
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 3384
//     },
//     {
//         "title": "react",
//         "studentsCount": 3645
//     },
//     {
//         "title": "docker",
//         "studentsCount": 1358
//     },
//     {
//         "title": "mongodb",
//         "studentsCount": 3619
//     },
//     {
//         "title": "nodejs",
//         "studentsCount": 2254
//     },
//     {
//         "title": "react",
//         "studentsCount": 2638
//     },
//     {
//         "title": "angular",
//         "studentsCount": 4245
//     }
// ]