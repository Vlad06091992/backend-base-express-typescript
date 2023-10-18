import request from "supertest";
import {app, Routes} from "../../src/app";
import {HTTP_STATUSES, HTTPStatusType} from "../../src/http_statuses/http_statuses";
import {
    UserCourseBindingsCreateModel
} from "../../src/features/users-courses-bindings/model/UserCourseBindingsCreateModel";

export const usersCoursesCreateTestManager = {
    async createBinding(data: UserCourseBindingsCreateModel, expectedStatusCode: HTTPStatusType = HTTP_STATUSES.CREATED_201) {
        const response = await request(app)
            .post(Routes.usersCoursesBindings)
            .send(data)
        expect(expectedStatusCode)

        let createdEntity;

        if (expectedStatusCode === HTTP_STATUSES.CREATED_201) {
            createdEntity = response.body
            expect(createdEntity).toEqual({
                courseId: data.courseId,
                userId: data.userId,
                userName: expect.any(String),
                courseTitle: expect.any(String),
            })
        }

        return {response, createdEntity}
    },
}