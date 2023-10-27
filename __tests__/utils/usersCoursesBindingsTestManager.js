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
exports.usersCoursesCreateTestManager = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const http_statuses_1 = require("../../src/http_statuses/http_statuses");
exports.usersCoursesCreateTestManager = {
    createBinding(data, expectedStatusCode = http_statuses_1.HTTP_STATUSES.CREATED_201) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
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
        });
    },
};
