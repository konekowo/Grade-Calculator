const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const browserLogin = require('./login');
const config = require('../config.json');
const fetchGrades = require('./fetchGrades');
const canyonsbrowserLogin = require('./CanyonsSchoolDistrict/login');
const canyonsfetchGrades = require('./CanyonsSchoolDistrict/fetchGrades');


app.use(express.static('client'));

io.on('connection', (socket) => {
    let schoolDist = "";
    // User connected
    console.log('A user connected socketID = ' + socket.id);
    setTimeout(() => {
        // to make animation on client look good
        io.to(socket.id).emit('connectionOk', 'ok')
    }, 1000);
    socket.on('disconnect', () => {
        // User disconnected
        console.log('A user disconnected socket id = ' + socket.id);
    });
    socket.on('schoolDist', (msg) => {
        schoolDist = msg;
        //console.log(msg);
    });
    socket.on('studentID', (msg) => {
        // when user submits their student ID and Password
        io.to(socket.id).emit('usernameProceed', 'next');
        let uncutmessagearray = msg.split("✅");
        let studentID = uncutmessagearray[0];
        let Password = uncutmessagearray[1];
        //console.log(schoolDist)
        if (schoolDist == "cms"){
            browserLogin.initLogin(studentID, Password, io, socket);
        }
        else if (schoolDist == "canyonSchoolDistrict"){
            canyonsbrowserLogin.initLogin(studentID, Password, io, socket);
        }
        

    });
    socket.on('courseChoose', (msg) => {
        let uncutmessagearray = msg.split("✂️");
        let studentID = uncutmessagearray[2];
        let Password = uncutmessagearray[3];
        let quarter = uncutmessagearray[0];
        let course = uncutmessagearray[1];
        if (schoolDist == "cms"){
            fetchGrades.loginAndFetchGrades(studentID, Password, io, socket, quarter, course);
        }
        else if (schoolDist == "canyonSchoolDistrict"){
            canyonsfetchGrades.loginAndFetchGrades(studentID, Password, io, socket, quarter, course);
        }

        
    });
});  


server.listen(config.port, () => {
    console.log('listening on *:'+config.port);
    console.log('website opened on http://127.0.0.1:'+config.port+'/');
});