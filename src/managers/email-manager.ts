import {emailAdapter,sendEmailOptions} from "../adapters/email-adapter";
import {WithId} from "mongodb";
import {UserType} from "../types/types";

export const emailManager = {
    async sendEmailRecoveryPassword(options:sendEmailOptions){
        emailAdapter.sendEmail(options)
    },
    async sendEmailConfirmationMessage(user:UserType){
        const email = user.accountData.email
        const htmlMessage = 'Confirm email'
        const senderName = "Vlad"
        const subject = "Registration"

        emailAdapter.sendEmail({to:email,htmlMessage,senderName,subject})
    }

    //...other functional for email sendings
}