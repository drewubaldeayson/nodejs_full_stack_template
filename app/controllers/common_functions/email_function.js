const fs = require('fs');
let CONSTANTS = require('../../../constants/constants').CONSTANTS;
let nodeMailer = require("nodemailer");

function initEmailParams(){
    return transport_options = {
        host: CONSTANTS.EMAIL_PARAMS.HOSTEMAIL,
        port: CONSTANTS.EMAIL_PARAMS.PORTEMAIL,
        auth:{
            user: CONSTANTS.EMAIL_PARAMS.USEREMAIL,
            pass: CONSTANTS.EMAIL_PARAMS.PASSWORDEMAIL
        }
    }
}

function sendEmail(from,to,cc,subject,body,attachments) {
    return new Promise(function (resolve, reject) {
        let transporter = nodeMailer.createTransport(initEmailParams());
        let mailOptions ={
            from: from,
            to: to,
            cc: cc,
            subject: subject,
            generateTextFromHTML: true,
            html: body,
            attachments: attachments
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}


module.exports.sendEmail = sendEmail;