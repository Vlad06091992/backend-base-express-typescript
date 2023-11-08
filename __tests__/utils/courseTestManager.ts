import request from "supertest";
import {app, Routes} from "../../src/app";
import {HTTP_STATUSES, HTTPStatusType} from "../../src/http_statuses/http_statuses";
import {CourseCreateModel} from "../../src/features/courses/model/CourseCreateModel";

;

export const courseTestManager = {
    async createCourse(data: CourseCreateModel, expectedStatusCode: HTTPStatusType = HTTP_STATUSES.CREATED_201) {
        const response = await request(app)
            .post(Routes.courses)
            .send(data)
            .expect(expectedStatusCode)

        let createdEntity;
        if (expectedStatusCode === HTTP_STATUSES.CREATED_201) {
            createdEntity = response.body
            expect(createdEntity).toEqual({
                id: expect.any(Number),
                title: data.title,
                studentsCount: expect.any(Number),
            })
        }

        return {response, createdEntity}
    }
}