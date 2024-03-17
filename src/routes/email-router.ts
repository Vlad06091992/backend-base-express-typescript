import {Router} from "express";
// pass

import nodemailer from "nodemailer";
import {emailAdapter} from "../adapters/email-adapter";
export const emailRouter = Router({})

emailRouter.post('/send', async (req, res) => {
    await emailAdapter.sendEmail({} as any)



    res.send({
        "email": req.body.email,
        "message": req.body.message,
        "subject": req.body.subject
    })

})

//     import {Router} from "express";
// // pass xqfWd2w5KfGyjPeuFfLD
//
//     const nodemailer = require("nodemailer");
//     export const emailRouter = Router({})
//
//     emailRouter.post('/send', async (req, res) => {
//
//         let transport = nodemailer.createTransport({
//             service: 'Mail.ru',
//             auth: {
//                 user: "vasha_pochta@mail.ru",
//                 pass: process.env.MAIL_RU_PASS // Пароль приложения
//             }
//         })
//         let args:= { from: "Dimych" <vasha_pochta@mail.ru>', to: 'почта куда отправить письмо', subject: 'Тема письма', html: '<h1>Message</h1>' }
//             let info = await transport.sendMail(args)
//
//
//             res.send({
//                 "email": req.body.email,
//                 "message": req.body.message,
//                 "subject": req.body.subject
//             })
//
//         })