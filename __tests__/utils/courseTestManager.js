"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseTestManager = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const http_statuses_1 = require("../../src/http_statuses/http_statuses");
;
exports.courseTestManager = {
    async createCourse(data, expectedStatusCode = http_statuses_1.HTTP_STATUSES.CREATED_201) {
        const response = await (0, supertest_1.default)(app_1.app)
            .post(app_1.Routes.courses)
            .send(data)
            .expect(expectedStatusCode);
        let createdEntity;
        if (expectedStatusCode === http_statuses_1.HTTP_STATUSES.CREATED_201) {
            createdEntity = response.body;
            expect(createdEntity).toEqual({
                id: expect.any(Number),
                title: data.title,
                studentsCount: expect.any(Number),
            });
        }
        return { response, createdEntity };
    }
};
