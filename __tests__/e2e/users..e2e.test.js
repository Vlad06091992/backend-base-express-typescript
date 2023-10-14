"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../src/index");
const http_statuses_1 = require("../../src/http_statuses/http_statuses");
describe('test for /users', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app).delete("/__test__/data");
    }));
    it('should return status 200 and empty', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .get('/users')
            .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 404 for not existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .get('/courses/333')
            .expect(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    //
    // it('should not added new course without correct data', async () => {
    //     await request(app)
    //         .post('/courses')
    //         .send({title: ''})
    //     expect(HTTP_STATUSES.BAD_REQUEST_400)
    // })
    //
    // it('should return status 200 and empty', async () => {
    //     await request(app)
    //         .get('/courses')
    //         .expect(HTTP_STATUSES.OK_200, [])
    // })
    //
    // let createdCourse1: any = null
    //
    // it('should added new course(vue)', async () => {
    //     const createResponse = await request(app)
    //         .post('/courses')
    //         .send({title: 'vue',studentsCount:0})
    //     expect(HTTP_STATUSES.CREATED_201)
    //     expect(createResponse.body).toEqual({id: expect.any(Number), title: 'vue',studentsCount:0})
    //
    //     createdCourse1 = createResponse.body
    //     await request(app).get('/courses').expect(HTTP_STATUSES.OK_200, [createdCourse1])
    // })
    //
    // it('should not updated new course with incorrect data', async () => {
    //     await request(app)
    //         .put(`/courses/35`)
    //         .send({title: 'newtitle'})
    //     expect(HTTP_STATUSES.BAD_REQUEST_400)
    // })
    //
    // it('course should be updated', async () => {
    //     const createResponse = await request(app)
    //         .put(`/courses/${createdCourse1.id}`)
    //         .send({title: 'vue composition API',studentsCount:3})
    //     expect(HTTP_STATUSES.CREATED_201)
    //     expect(createResponse.body).toEqual({id: expect.any(Number), title: 'vue composition API',studentsCount:3})
    // })
    //
    //
    // let createdCourse2: any = null
    //
    // it('should added new course(angular)', async () => {
    //     const createResponse = await request(app)
    //         .post('/courses')
    //         .send({title: 'angular',studentsCount:0})
    //     expect(HTTP_STATUSES.CREATED_201)
    //     expect(createResponse.body).toEqual({id: expect.any(Number), title: 'angular',studentsCount:0})
    //
    //     createdCourse2 = createResponse.body
    //
    //
    //     const coursesResponse = await request(app).get('/courses')
    //
    //     expect(coursesResponse.body.length).toBe(2)
    // })
    //
    // it('course should be updated', async () => {
    //     const createResponse = await request(app)
    //         .put(`/courses/${createdCourse2.id}`)
    //         .send({title: 'ANGULAR!!!',studentsCount:0})
    //     expect(HTTP_STATUSES.CREATED_201)
    //     expect(createResponse.body).toEqual({id: expect.any(Number), title: 'ANGULAR!!!',studentsCount:0})
    // })
    //
    // it('all courses should be deleted', async () => {
    //     await request(app)
    //         .delete(`/courses/${createdCourse1.id}`)
    //         .expect(HTTP_STATUSES.NO_CONTENT_204)
    //     await request(app)
    //         .get(`/courses/${createdCourse1.id}`)
    //         .expect(HTTP_STATUSES.NOT_FOUND_404)
    //     await request(app)
    //         .delete(`/courses/${createdCourse2.id}`)
    //         .expect(HTTP_STATUSES.NO_CONTENT_204)
    //     await request(app)
    //         .get(`/courses`)
    //         .expect(HTTP_STATUSES.OK_200, [])
    // })
});
