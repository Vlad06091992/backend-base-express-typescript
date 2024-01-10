import request from "supertest";
import {app, Routes} from "../../src/app";
import {HTTP_STATUSES} from "../../src/http_statuses/http_statuses";
import {UserType} from "src/types/types";
import {UserCreateModel} from "../../src/features/users/model/UserCreateModel";
import {UserUpdateModel} from "../../src/features/users/model/UserUpdateModel";
import {userTestManager} from "../utils/userTestManager";
import {body} from "express-validator";


describe('test for /users', () => {

    beforeAll(async () => {
        await request(app).delete(`${Routes.__test__}/data`)
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
        const data = {userName: ''};
        await userTestManager.createUser(data, HTTP_STATUSES.BAD_REQUEST_400)
        await request(app)
            .get(Routes.users)
        expect(HTTP_STATUSES.OK_200)
        expect([])

    })


    it('should return status 200 and empty array', async () => {
        await request(app)
            .get(Routes.users)
            .expect(HTTP_STATUSES.OK_200)
            .expect([])
    })

    let createdUser1: UserType | null = null

    it('should added new user(Kolya)', async () => {
        const data: UserCreateModel = {userName: 'Kolya'};
        const {response, createdEntity} = await userTestManager.createUser(data)
        createdUser1 = createdEntity

        expect(createdUser1).toEqual({id: expect.any(Number), userName: data.userName})
        await request(app).get(Routes.users)
            .expect(HTTP_STATUSES.OK_200)
            .expect([createdUser1])
    })

    it("Should return a found entity by ID", async () => {
        if (createdUser1) {
            const createResponse = await request(app)
                .get(`${Routes.users}/${createdUser1.id}`)
            expect(createResponse.body.userName).toBe('Kolya')
        }
    })


    it('should not updated new entity with incorrect data', async () => {
        await request(app)
            .put(`${Routes.users}/35`)
            .send({userName: 'newUserName'})
        expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get(Routes.users)
        expect(HTTP_STATUSES.BAD_REQUEST_400)


    })

    it('entity should be updated', async () => {
        if (createdUser1) {
            const data: UserUpdateModel = {userName: "KOLYA"};
            const createResponse = await request(app)
                .put(`${Routes.users}/${createdUser1.id}`)
                .send(data)
            expect(HTTP_STATUSES.NO_CONTENT_204)
            const updatedUser = await request(app)
                .get(`${Routes.users}/${createdUser1.id}`)
            expect(updatedUser.body).toEqual({id: expect.any(Number), userName: 'KOLYA'})
        }
    })


    let createdUser2: UserType | null = null

    it('should added new user(Maxim)', async () => {
        const data: UserCreateModel = {userName: 'Maxim'};
        const {response, createdEntity} = await userTestManager.createUser(data)
        createdUser2 = createdEntity

        expect(HTTP_STATUSES.CREATED_201)
        expect(createdUser2).toEqual({id: expect.any(Number), userName: data.userName})

        const coursesResponse = await request(app).get(Routes.users)
        expect(coursesResponse.body.length).toBe(2)
    })


    it('entity should be updated', async () => {
        if (createdUser2) {
            const data: UserUpdateModel = {userName: "Vlad"};
            const createResponse = await request(app)
                .put(`${Routes.users}/${createdUser2.id}`)
                .send(data)
            expect(HTTP_STATUSES.NO_CONTENT_204)

            const updatedUser = await request(app)
                .get(`${Routes.users}/${createdUser2.id}`)
            expect(updatedUser.body).toEqual({id: expect.any(Number), userName: 'Vlad'})
        }
    })


    it('all entities should be deleted', async () => {
        if (createdUser1 && createdUser2) {
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
        }
    })


})