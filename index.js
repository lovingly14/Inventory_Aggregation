'use strict';
const config = require('./config');
const api = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('./schema/mongoose');
var ElectronPDF = require('electron-pdf');

// const nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
// var http = require('http');
const ejs = require('ejs');
// var path = require('path');

const express = require('express');
const app = express();

// const client = require('jsreport-client')('http://localhost:3000');

// app.get('/report', (req, res, next) => {
//     client.render({
//         template: {
//             content: 'hello {{someText}}',
//             recipe: 'html',
//             engine: 'handlebars'
//         },
//         data: { someText: 'world!!' }
//     });
    
//     const bodyBuffer = res.body();
//     console.log(bodyBuffer.toString());    
// });
  
//render().catch(console.error);
  
app.use(bodyParser.json());
app.use('/api', api);
app.set('view engine', 'ejs');
app.listen(config.PORT1, function () {
    console.log(`Server is listening on ${config.PORT1}`);
    mongoose.connect();
}).on('error', function () {  
    console.log('Something went wrong');
});
//app.use(json2xls.middleware);

// var hostname = 'localhost';
// var port = 3000;
// var exporter = new ElectronPDF();
// exporter.on('charged', () => {
//     //Only start the express server once the exporter is ready
//     app.listen(port, hostname, function() {
//         console.log(`Export Server running at http://${hostname}:${port}`);
//     });
// });
// exporter.start();