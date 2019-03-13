'use strict';
const nodemailer = require('nodemailer');
const config = require('../config');

class EmailController {
    static sendEMailMessage (req, res) {
        try {
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                'host': config.host,
                'port': config.PORT2,
                'secure': true, // true for 465, false for other ports
                'auth': {
                    'user': config.User, // generated ethereal user
                    'pass': config.Pass// generated ethereal password
                
                },
                'tls': {
                    // do not fail on invalid certs
                    'rejectUnauthorized': false
                }
            });

            // setup email data with unicode symbols
            const mailOptions = {
                'from': config.From, // sender address
                'to': config.To, // list of receivers
                'subject': 'Hello ', // subject line
                'text': 'Hello world?', // plain text body
                'html': '<b>Hello world?</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions);                                
        }
        catch (error) {
            res.status(400).send({
                'message': JSON.stringify(error),
                'success': false,
                'status': 400
            });
        }      
    }       
}

module.exports = {EmailController};


