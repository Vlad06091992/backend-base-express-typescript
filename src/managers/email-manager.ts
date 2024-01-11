import {emailAdapter,sendEmailOptions} from "../adapters/email-adapter";

export const emailManager = {
    async sendEmailRecoveryPassword(options:sendEmailOptions){
        emailAdapter.sendEmail(options)
    }
    //...other functional for email sendings
}