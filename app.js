const app = require('express')();
const http = require('http').Server(app);

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://krishna_teja:cslk.com@screen-recording.fd30u70.mongodb.net/?retryWrites=true&w=majority");

const User = require('./models/userModel');

http.listen(3000, function(){
    console.log('Server is running');
});