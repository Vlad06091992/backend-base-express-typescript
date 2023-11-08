"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const http_statuses_1 = require("../../src/http_statuses/http_statuses");
const courseTestManager_1 = require("../utils/courseTestManager");
describe('test for /courses', () => {
    beforeAll(async () => {
        await (0, supertest_1.default)(app_1.app).delete(`${app_1.Routes.__test__}/data`);
    });
    it('should return status 200 and empty', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.courses)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
    });
    it('should return 404 for not existing course', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get(`${app_1.Routes.courses}/333`)
            .expect(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    it('should not added new course without correct data', async () => {
        const data = { title: '', studentsCount: 0 };
        const { response, createdEntity } = await courseTestManager_1.courseTestManager.createCourse(data, http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    });
    it('should return status 200 and empty', async () => {
        await (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.courses)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
    });
    let createdCourse1 = null;
    it('should added new course(vue)', async () => {
        const data = { title: 'vue', studentsCount: 0 };
        const { response, createdEntity } = await courseTestManager_1.courseTestManager.createCourse(data);
        debugger;
        createdCourse1 = createdEntity;
        await (0, supertest_1.default)(app_1.app).get(app_1.Routes.courses).expect(http_statuses_1.HTTP_STATUSES.OK_200, [createdCourse1]);
    });
    it("Should return a found entity by ID", async () => {
        const createResponse = await (0, supertest_1.default)(app_1.app)
            .get(`${app_1.Routes.courses}/${createdCourse1.id}`);
        expect(createResponse.body.title).toBe('vue');
    });
    it('should not updated new course with incorrect data', async () => {
        await (0, supertest_1.default)(app_1.app)
            .put(`${app_1.Routes.courses}/35`)
            .send({ title: 'newtitle' });
        expect(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    });
    it('course should be updated', async () => {
        const data = { title: 'vue 3', studentsCount: 0 };
        const createResponse = await (0, supertest_1.default)(app_1.app)
            .put(`${app_1.Routes.courses}/${createdCourse1.id}`)
            .send(data);
        expect(http_statuses_1.HTTP_STATUSES.CREATED_201);
        expect(createResponse.body).toEqual({ id: expect.any(Number), title: 'vue 3' });
    });
    let createdCourse2 = null;
    it('should added new course(angular)', async () => {
        const data = { title: 'angular', studentsCount: 0 };
        const { response, createdEntity } = await courseTestManager_1.courseTestManager.createCourse(data);
        createdCourse2 = createdEntity;
        const coursesResponse = await (0, supertest_1.default)(app_1.app).get(app_1.Routes.courses);
        expect(coursesResponse.body.length).toBe(2);
    });
    it('course should be updated', async () => {
        const data1 = { title: 'ANGULAR!!!', studentsCount: 0 };
        const createResponse = await (0, supertest_1.default)(app_1.app)
            .put(`${app_1.Routes.courses}/${createdCourse2.id}`)
            .send(data1);
        expect(http_statuses_1.HTTP_STATUSES.CREATED_201);
        expect(createResponse.body).toEqual({ id: expect.any(Number), title: 'ANGULAR!!!' });
    });
    it('all courses should be deleted', async () => {
        await (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.Routes.courses}/${createdCourse1.id}`)
            .expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
        await (0, supertest_1.default)(app_1.app)
            .get(`${app_1.Routes.courses}/${createdCourse1.id}`)
            .expect(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        await (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.Routes.courses}/${createdCourse2.id}`)
            .expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
        await (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.courses)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
    });
});
