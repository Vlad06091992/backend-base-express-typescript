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
const src_1 = require("../../src");
describe('/courses', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete("/__test__/data");
    }));
    it('should return status 200 and empty', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(src_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 404 for not existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/333')
            .expect(src_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('should not added new course without correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: '' });
        expect(src_1.HTTP_STATUSES.BAD_REQUEST_400);
    }));
    it('should return status 200 and empty', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(src_1.HTTP_STATUSES.OK_200, []);
    }));
    let createdCourse1 = null;
    it('should added new course(vue)', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: 'vue' });
        expect(src_1.HTTP_STATUSES.CREATED_201);
        expect(createResponse.body).toEqual({ id: expect.any(Number), title: 'vue' });
        createdCourse1 = createResponse.body;
        yield (0, supertest_1.default)(src_1.app).get('/courses').expect(src_1.HTTP_STATUSES.OK_200, [createdCourse1]);
    }));
    it('should not updated new course with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put(`/courses/35`)
            .send({ title: 'newtitle' });
        expect(src_1.HTTP_STATUSES.BAD_REQUEST_400);
    }));
    it('course should be updated', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .put(`/courses/${createdCourse1.id}`)
            .send({ title: 'vue composition API' });
        expect(src_1.HTTP_STATUSES.CREATED_201);
        expect(createResponse.body).toEqual({ id: expect.any(Number), title: 'vue composition API' });
    }));
    let createdCourse2 = null;
    it('should added new course(vue)', () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({ title: 'angular' });
        expect(src_1.HTTP_STATUSES.CREATED_201);
        expect(createResponse.body).toEqual({ id: expect.any(Number), title: 'vue' });
        const coursesResponse = yield (0, supertest_1.default)(src_1.app).get('/courses');
        expect(coursesResponse.body.courses.length).toBe(2);
    }));
});
