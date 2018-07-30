const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');

const ToDoItem = require("../models/toDoItem");

router.post("/create", (req, res) => {

        const newTaskInfo = req.body;
        console.log(newTaskInfo);
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
