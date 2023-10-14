import {RootDBType} from "./types";

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