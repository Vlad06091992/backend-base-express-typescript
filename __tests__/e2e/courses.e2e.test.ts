import request from "supertest";
import {app, HTTP_STATUSES} from "../../src";


describe('/courses', () => {

    beforeAll(async () => {
        await request(app).delete("/__test__/data")
    })

    it('should return status 200 and empty', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })


    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/333')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should not added new course without correct data', async () => {
        await request(app)
            .post('/courses')
            .send({title: ''})
        expect(HTTP_STATUSES.BAD_REQUEST_400)
    })

    it('should return status 200 and empty', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdCourse1: any = null

    it('should added new course(vue)', async () => {
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'vue'})
        expect(HTTP_STATUSES.CREATED_201)
        expect(createResponse.body).toEqual({id: expect.any(Number), title: 'vue'})

        createdCourse1 = createResponse.body
        await request(app).get('/courses').expect(HTTP_STATUSES.OK_200, [createdCourse1])
    })

    it('should not updated new course with incorrect data', async () => {
        await request(app)
            .put(`/courses/35`)
            .send({title: 'newtitle'})
        expect(HTTP_STATUSES.BAD_REQUEST_400)
    })

    it('course should be updated', async () => {
        const createResponse = await request(app)
            .put(`/courses/${createdCourse1.id}`)
            .send({title: 'vue composition API'})
        expect(HTTP_STATUSES.CREATED_201)
        expect(createResponse.body).toEqual({id: expect.any(Number), title: 'vue composition API'})
    })


    let createdCourse2: any = null

    it('should added new course(angular)', async () => {
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'angular'})
        expect(HTTP_STATUSES.CREATED_201)
        expect(createResponse.body).toEqual({id: expect.any(Number), title: 'angular'})

        createdCourse2 = createResponse.body


        const coursesResponse = await request(app).get('/courses')

        expect(coursesResponse.body.length).toBe(2)
    })

    it('course should be updated', async () => {
        const createResponse = await request(app)
            .put(`/courses/${createdCourse2.id}`)
            .send({title: 'ANGULAR!!!'})
        expect(HTTP_STATUSES.CREATED_201)
        expect(createResponse.body).toEqual({id: expect.any(Number), title: 'ANGULAR!!!'})
    })

    it('all courses should be deleted', async () => {
        await request(app)
            .delete(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
        await request(app)
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
        await request(app)
            .delete(`/courses/${createdCourse2.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
        await request(app)
            .get(`/courses`)
              .expect(HTTP_STATUSES.OK_200, [])
    })


})