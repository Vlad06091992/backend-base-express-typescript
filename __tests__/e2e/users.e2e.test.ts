import request from "supertest";
import {app, Routes} from "../../src/app";
import {HTTP_STATUSES} from "../../src/http_statuses/http_statuses";
import {UserType} from "../../src/types";



describe('test for /users', () => {

    beforeAll(async () => {
        await request(app).delete("/__test__/data")
    })

    it('should return status 200 and empty array', async () => {
        await request(app)
            .get(Routes.users)
            .expect(HTTP_STATUSES.OK_200, [])
    })


    it('should return 404 for not existing entity', async () => {
        await request(app)
            .get(`${Routes.users}/2222`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })


    it('should not added new entity without correct data', async () => {
        await request(app)
            .post(Routes.users)
            .send({title:''})
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    })




    it('should return status 200 and empty array', async () => {
        await request(app)
            .get(Routes.users)
            .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdUser1: UserType | null = null

    // it('should added new user(Kolyan)', async () => {
    //     const createResponse = await request(app)
    //         .post(Routes.users)
    //         .send({title: 'vue',studentsCount:0})
    //     expect(HTTP_STATUSES.CREATED_201)
    //     expect(createResponse.body).toEqual({id: expect.any(Number), title: 'vue',studentsCount:0})
    //
    //     createdUser1 = createResponse.body
    //     await request(app).get('/courses').expect(HTTP_STATUSES.OK_200, [createdUser1])
    // })

    it('should not updated new course with incorrect data', async () => {
        await request(app)
            .put(`${Routes.users}/35`)
            .send({title: 'newtitle'})
        expect(HTTP_STATUSES.BAD_REQUEST_400)
    })

    it('course should be updated', async () => {
        if(createdUser1) {
            const createResponse = await request(app)
                .put(`${Routes.users}/${createdUser1.id}`)
                .send({title: 'vue composition API', studentsCount: 3})
            expect(HTTP_STATUSES.CREATED_201)
            expect(createResponse.body).toEqual({
                id: expect.any(Number),
                title: 'vue composition API',
                studentsCount: 3
            })
        }})


    let createdUser2: UserType | null = null

    // it('should added new course(angular)', async () => {
    //     const createResponse = await request(app)
    //         .post('/courses')
    //         .send({title: 'angular',studentsCount:0})
    //     expect(HTTP_STATUSES.CREATED_201)
    //     expect(createResponse.body).toEqual({id: expect.any(Number), title: 'angular',studentsCount:0})
    //
    //     createdUser2 = createResponse.body
    //     const coursesResponse = await request(app).get('/courses')
    //     expect(coursesResponse.body.length).toBe(2)
    // })

    it('course should be updated', async () => {
        if(createdUser2){
        const createResponse = await request(app)
            .put(`${Routes.users}/${createdUser2.id}`)
            .send({title: 'ANGULAR!!!',studentsCount:0})
        expect(HTTP_STATUSES.CREATED_201)
        expect(createResponse.body).toEqual({id: expect.any(Number), title: 'ANGULAR!!!',studentsCount:0})
    }})

    it('all courses should be deleted', async () => {
        if(createdUser1 && createdUser2) {
            await request(app)
                .delete(`${Routes.users}/${createdUser1.id}`)
                .expect(HTTP_STATUSES.NO_CONTENT_204)
            await request(app)
                .get(`${Routes.users}/${createdUser1.id}`)
                .expect(HTTP_STATUSES.NOT_FOUND_404)
            await request(app)
                .delete(`${Routes.users}/${createdUser2.id}`)
                .expect(HTTP_STATUSES.NO_CONTENT_204)
            await request(app)
                .get(`${Routes.users}`)
                .expect(HTTP_STATUSES.OK_200, [])
        }})


})