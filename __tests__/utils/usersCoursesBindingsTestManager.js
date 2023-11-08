"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCoursesCreateTestManager = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const http_statuses_1 = require("../../src/http_statuses/http_statuses");
exports.usersCoursesCreateTestManager = {
    async createBinding(data, expectedStatusCode = http_statuses_1.HTTP_STATUSES.CREATED_201) {
        const response = await (0, supertest_1.default)(app_1.app)
            .post(app_1.Routes.usersCoursesBindings)
            .send(data);
        expect(expectedStatusCode);
        let createdEntity;
        if (expectedStatusCode === http_statuses_1.HTTP_STATUSES.CREATED_201) {
            createdEntity = response.body;
            expect(createdEntity).toEqual({
                courseId: data.courseId,
                userId: data.userId,
                userName: expect.any(String),
                courseTitle: expect.any(String),
            });
        }
        return { response, createdEntity };
    },
};
