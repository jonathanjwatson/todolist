require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var ToDoItem = require('../models/toDoItem');
var DailyList = require('../models/dailyList');

mongoose.promise = global.Promise;

var db = mongoose.connection;

ToDoItem.remove({}, function(err) {
    console.log(err);
});

DailyList.remove({}, function(err) {
    console.log(err);
});


var ToDoItemOne = new ToDoItem({
    name: "Go to Grocery Store",
    description: "Buy all the things",
    completed: false,
    dailyItem: true
});

var ToDoItemTwo = new ToDoItem({
    name: "Mow the Grass",
    description: "Front and Back",
    completed: false,
    dailyItem: false
});

var ToDoItemThree = new ToDoItem({
    name: "Buy Biltong Jerkey",
    description: "Lots of it.",
    completed: false,
    dailyItem: false
});

var DailyListOne = new DailyList({
    todaysDate: new Date(Date.UTC(2018, 06, 29, 0, 0, 0.0)),
    // todaysDate: '2018-07-29 0:0:0.0',
    taskList: [ToDoItemOne, ToDoItemTwo]
});

var DailyListTwo = new DailyList({
    // todaysDate: '2018-07-30 0:0:0.0',
    todaysDate: new Date(Date.UTC(2018, 06, 30, 0, 0, 0.0)),
    taskList: [ToDoItemThree, ToDoItemTwo]
});



ToDoItemOne.save( (err) => {
    if (err) console.log('ToDoItemOne' + err);
    console.log('ToDoItemOne created');
});
ToDoItemTwo.save( (err) => {
    if (err) console.log('ToDoItemTwo error' + err);
    console.log('ToDoItemTwo created');
});
ToDoItemThree.save( (err) => {
    if (err) console.log('ToDoItemThree error' + err);
    console.log('ToDoItemThree created');
});
DailyListOne.save( (err) => {
    if (err) console.log('DailyListOne error' + err);
    console.log('DailyListOne created');
});
DailyListTwo.save( (err) => {
    if (err) console.log('DailyListTwo error' + err);
    console.log('DailyListTwo created');
});

// CONNECTION EVENTS
db.once('open', function() {
  console.log("Opened mongoose.");
});

db.once('close', function() {
  console.log("Closed mongoose.");
});

db.on('connected', function() {
  console.log('Mongoose connected to ' + db.host + ':' + db.port + '/' + db.name);
});

db.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

module.exports = db;