require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
var cron = require('cron');
const DailyListController = require("./controllers/dailyList");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully');    
}); 

// If the connection throws an error
connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
}); 

app.use(bodyParser.json());

var cronJob = cron.job("* 1 * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    console.info('cron job completed');
}); 
cronJob.start();

app.use('/api/v1/dailyList', DailyListController);

app.use(express.static(__dirname + '/client/build/'));
app.get('*', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
  })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})