const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');

const DailyList = require("../models/dailyList");
const ToDoItem = require("../models/toDoItem");


gatherToDoItems = () => {
    arrayOfToDoItems = [];
    //TODO: Find all ToDoItems where dailyItem = true;
    ToDoItem.find({dailyItem: true}).then(toDoResults => {
        console.localStorage(toDoResults);
        return toDoResults;
        // console.log(dailyListResults);
        // let resultsToReturn = dailyListResults.filter(singleResult => {
            
        //     console.log(Date.parse(singleResult.todaysDate));
        //     console.log(Date.parse(todaysDate));
        //     console.log(singleResult.todaysDate.toString() == todaysDate.toString());
        //     var offset = todaysDate.getTimezoneOffset() * 60 * 1000;
        //     console.log(offset);
        //     return Date.parse(singleResult.todaysDate) == (Date.parse(todaysDate) - offset);
        // });
        // console.log(resultsToReturn);
        // res.json(resultsToReturn);
    }).catch(err => {
        console.error(err);
    });

    // TODO: find all ToDoItems where today's day of week + Task = true; 

}



module.exports = gatherToDoItems;
