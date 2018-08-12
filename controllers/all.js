const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');
const ToDoItem = require("../models/toDoItem");

router.get("/", (req, res) => {
    ToDoItem.find()
    .then(toDoResults => {
        console.log(toDoResults);
        res.json(toDoResults);
    }).catch(err => {
        console.error(err);
    });
});




module.exports = router;
