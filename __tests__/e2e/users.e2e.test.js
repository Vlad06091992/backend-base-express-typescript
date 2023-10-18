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
const app_1 = require("../../src/app");
const http_statuses_1 = require("../../src/http_statuses/http_statuses");
const userTestManager_1 = require("../utils/userTestManager");
describe('test for /users', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete(`${app_1.Routes.__test__}/data`);
    }));
    it('should return status 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 404 for not existing entity', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.Routes.users}/2222`)
            .expect(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('should not added new entity without correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { userName: '' };
        yield userTestManager_1.userTestManager.createUser(data, http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users);
        expect(http_statuses_1.HTTP_STATUSES.OK_200);
        expect([]);
    }));
    it('should return status 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200)
            .expect([]);
    }));
    let createdUser1 = null;
    it('should added new user(Kolya)', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { userName: 'Kolya' };
        const { response, createdEntity } = yield userTestManager_1.userTestManager.createUser(data);
        createdUser1 = createdEntity;
        expect(createdUser1).toEqual({ id: expect.any(Number), userName: data.userName });
        yield (0, supertest_1.default)(app_1.app).get(app_1.Routes.users)
            .expect(http_statuses_1.HTTP_STATUSES.OK_200)
            .expect([createdUser1]);
    }));
    it("Should return a found entity by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        if (createdUser1) {
            const createResponse = yield (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}/${createdUser1.id}`);
            expect(createResponse.body.userName).toBe('Kolya');
        }
    }));
    it('should not updated new entity with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.Routes.users}/35`)
            .send({ userName: 'newUserName' });
        expect(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.Routes.users);
        expect(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    }));
    it('entity should be updated', () => __awaiter(void 0, void 0, void 0, function* () {
        if (createdUser1) {
            const data = { userName: "KOLYA" };
            const createResponse = yield (0, supertest_1.default)(app_1.app)
                .put(`${app_1.Routes.users}/${createdUser1.id}`)
                .send(data);
            expect(http_statuses_1.HTTP_STATUSES.CREATED_201);
            expect(createResponse.body).toEqual({
                id: expect.any(Number),
                userName: data.userName,
            });
        }
    }));
    let createdUser2 = null;
    it('should added new user(Maxim)', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { userName: 'Maxim' };
        const { response, createdEntity } = yield userTestManager_1.userTestManager.createUser(data);
        createdUser2 = createdEntity;
        expect(http_statuses_1.HTTP_STATUSES.CREATED_201);
        expect(createdUser2).toEqual({ id: expect.any(Number), userName: data.userName });
        const coursesResponse = yield (0, supertest_1.default)(app_1.app).get(app_1.Routes.users);
        expect(coursesResponse.body.length).toBe(2);
    }));
    it('entity should be updated', () => __awaiter(void 0, void 0, void 0, function* () {
        if (createdUser2) {
            const data = { userName: "KOLYA" };
            const createResponse = yield (0, supertest_1.default)(app_1.app)
                .put(`${app_1.Routes.users}/${createdUser2.id}`)
                .send(data);
            expect(http_statuses_1.HTTP_STATUSES.CREATED_201);
            expect(createResponse.body).toEqual({
                id: expect.any(Number),
                userName: data.userName,
            });
        }
    }));
    it('all entities should be deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        if (createdUser1 && createdUser2) {
            yield (0, supertest_1.default)(app_1.app)
                .delete(`${app_1.Routes.users}/${createdUser1.id}`)
                .expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            yield (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}/${createdUser1.id}`)
                .expect(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            yield (0, supertest_1.default)(app_1.app)
                .delete(`${app_1.Routes.users}/${createdUser2.id}`)
                .expect(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            yield (0, supertest_1.default)(app_1.app)
                .get(`${app_1.Routes.users}`)
                .expect(http_statuses_1.HTTP_STATUSES.OK_200, []);
        }
    }));
});
