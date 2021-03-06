const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ToDoItemSchema = new Schema({
    name: String,
    description: String,
    completed: Boolean,
    dateDue: Date,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    sunday: Boolean,
    created_at: Date,
    updated_at: Date
});


const DailyListSchema = new Schema({
    todaysDate: Date,
    taskList: [ToDoItemSchema],
    created_at: Date,
    updated_at: Date
});


ToDoItemSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

DailyListSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var ToDoItemModel = mongoose.model("ToDoItem", ToDoItemSchema);
var DailyListModel = mongoose.model("DailyList", DailyListSchema);

module.exports = {
    ToDoItem: ToDoItemModel,
    DailyList: DailyListModel
};