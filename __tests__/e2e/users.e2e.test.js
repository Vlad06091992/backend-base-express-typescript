"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const http_statuses_1 = require("../../src/http_statuses/http_statuses");
const userTestManager_1 = require("../utils/userTestManager");
describe('test for /users', () => {
    beforeAll(async () => {
        await (0, supertest_1.default)(app_1.app).delete(`${app_1.Routes.__test__}/data`);
    });
    it('should return status 200 and empty array', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
    });
    it('should return 404 for not existing entity', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get(`${app_1.Routes.users}/2222`)
            .expect(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    it('should not added new entity without correct data', async () => {
        const data = { userName: '' };
        await userTestManager_1.userTestManager.createUser(data, http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        await (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users);
        expect(http_statuses_1.HTTP_STATUSES.OK_200);
        expect([]);
    });
    it('should return status 200 and empty array', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200)
            .expect([]);
    });
    let createdUser1 = null;
    it('should added new user(Kolya)', async () => {
        const data = { userName: 'Kolya' };
        const { response, createdEntity } = await userTestManager_1.userTestManager.createUser(data);
        createdUser1 = createdEntity;
        expect(createdUser1).toEqual({ id: expect.any(Number), userName: data.userName });
        await (0, supertest_1.default)(app_1.app).get(app_1.Routes.users)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200)
            .expect([createdUser1]);
    });
    it("Should return a found entity by ID", async () => {
        if (createdUser1) {
            const createResponse = await (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}/${createdUser1.id}`);
            expect(createResponse.body.userName).toBe('Kolya');
        }
    });
    it('should not updated new entity with incorrect data', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put(`${app_1.Routes.users}/35`)
            .send({ userName: 'newUserName' });
        expect(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        await (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users);
        expect(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    });
    it('entity should be updated', async () => {
        if (createdUser1) {
            const data = { userName: "KOLYA" };
            const createResponse = await (0, supertest_1.default)(app_1.app)
                .put(`${app_1.Routes.users}/${createdUser1.id}`)
                .send(data);
            expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            const updatedUser = await (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}/${createdUser1.id}`);
            expect(updatedUser.body).toEqual({ id: expect.any(Number), userName: 'KOLYA' });
        }
    });
    let createdUser2 = null;
    it('should added new user(Maxim)', async () => {
        const data = { userName: 'Maxim' };
        const { response, createdEntity } = await userTestManager_1.userTestManager.createUser(data);
        createdUser2 = createdEntity;
        expect(http_statuses_1.HTTP_STATUSES.CREATED_201);
        expect(createdUser2).toEqual({ id: expect.any(Number), userName: data.userName });
        const coursesResponse = await (0, supertest_1.default)(app_1.app).get(app_1.Routes.users);
        expect(coursesResponse.body.length).toBe(2);
    });
    it('entity should be updated', async () => {
        if (createdUser2) {
            const data = { userName: "Vlad" };
            const createResponse = await (0, supertest_1.default)(app_1.app)
                .put(`${app_1.Routes.users}/${createdUser2.id}`)
                .send(data);
            expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            const updatedUser = await (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}/${createdUser2.id}`);
            expect(updatedUser.body).toEqual({ id: expect.any(Number), userName: 'Vlad' });
        }
    });
    it('all entities should be deleted', async () => {
        if (createdUser1 && createdUser2) {
            await (0, supertest_1.default)(app_1.app)
                .delete(`${app_1.Routes.users}/${createdUser1.id}`)
                .expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            await (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}/${createdUser1.id}`)
                .expect(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            await (0, supertest_1.default)(app_1.app)
                .delete(`${app_1.Routes.users}/${createdUser2.id}`)
                .expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            await (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}`)
                .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
        }
    });
});
