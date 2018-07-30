const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');

const DailyList = require("../models/dailyList");
const ToDoItem = require("../models/toDoItem");

router.get("/", (req, res) => {

    let arrayOfToDoItems = [];
    console.log("Array of To Do Items");
    console.log(arrayOfToDoItems);
    //TODO: Find all ToDoItems where dailyItem = true;
    ToDoItem.find({dailyItem: true}).then(toDoResults => {
        console.log(toDoResults);
        toDoResults.map(toDoResult => {
            arrayOfToDoItems.push(toDoResult);
        })
    }).then(() => {
        // console.log("Array of ToDo Items");
        // console.log(arrayOfToDoItems);
        // res.json(arrayOfToDoItems);

        var todaysDate = new Date();
        var dayOfWeek = todaysDate.getDay();
        var dayOfWeekToFind = dayOfWeek + "Task";
        console.log(dayOfWeekToFind)
        ToDoItem.find({mondayTask: true}).then(results => {
            console.log(results);
            results.map(result => {
                arrayOfToDoItems.push(result);
            })
        }).then(() => {
            res.json(arrayOfToDoItems);
        }).catch(err => {
            console.error(err);
        })
        // ToDoItem.find({dayOfWeekToFind: true}).then(toDoResults => {
        //     console.log(toDoResults);
        // }).catch(err) => {
        //     console.error(err);
        // }
    }).catch(err => {
        console.error(err);
    });
    
});




module.exports = router;
