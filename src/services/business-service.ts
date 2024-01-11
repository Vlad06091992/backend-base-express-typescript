import {emailAdapter, sendEmailOptions} from "../adapters/email-adapter";
import {emailManager} from "../managers/email-manager";

export const businessService = {
    recoverypassword(options: sendEmailOptions) {
        // code...
        emailManager.sendEmailRecoveryPassword(options)
    }
    //...other business functional
}