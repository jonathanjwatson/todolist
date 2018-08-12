const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');
const moment = require('moment');

const ToDoItem = require("../models/toDoItem");

router.post("/create", (req, res) => {

        const newTaskInfo = req.body;
        console.log(newTaskInfo);
        newTaskInfo.dateDue = moment(req.body.dateDue).utc().hour(0).minutes(0).seconds(0).milliseconds(0);
        console.log(newTaskInfo.dateDue);
        const newTask = new ToDoItem(newTaskInfo);
        console.log(newTask);
        newTask
          .save()
          .then(() => {
            res.json(newTask);
          })
          .catch(err => console.log(err))

});




module.exports = router;
