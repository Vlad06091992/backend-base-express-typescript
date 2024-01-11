import nodemailer from "nodemailer";

export type sendEmailOptions = {
    to:string,
    senderName?:string,
    htmlMessage:string,
    subject:string
}

export const emailAdapter = {
    async sendEmail({to,subject,htmlMessage,senderName}:sendEmailOptions) {
        let transport = nodemailer.createTransport({
            service: 'Mail.ru',
            auth: {
                user: "Smirnov.ru92@mail.ru",
                pass: process.env.MAIL_RU_PASS // Пароль приложения
            }
        })

        const info = await transport.sendMail({
            from: `${senderName} <Smirnov.ru92@mail.ru>`,
            to, //куда отправлять
            subject,    //тема
            html: htmlMessage      //сообщение
        });

        return info

    }
}