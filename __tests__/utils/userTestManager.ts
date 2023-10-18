import request from "supertest";
import {app, Routes} from "../../src/app";
import {UserCreateModel} from "../../src/features/users/model/UserCreateModel"
import {HTTP_STATUSES, HTTPStatusType} from "../../src/http_statuses/http_statuses";

export const userTestManager = {
    async createUser(data: UserCreateModel, expectedStatusCode: HTTPStatusType = HTTP_STATUSES.CREATED_201) {
        const response = await request(app)
            .post(Routes.users)
            .send(data)
        expect(expectedStatusCode)

        let createdEntity;

        if (expectedStatusCode === HTTP_STATUSES.CREATED_201) {
            createdEntity = response.body
            expect(createdEntity).toEqual({
                id: expect.any(Number),
                userName: data.userName
            })
        }

        return {response, createdEntity}
    }
}