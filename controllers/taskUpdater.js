const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');
const moment = require('moment');

const ToDoItem = require("../models/toDoItem");

router.get("/:id", (req, res) => {
        const idToUpdate = req.params.id;
        console.log(idToUpdate);
        ToDoItem.findById(idToUpdate)
        .then((toDoItem) => {
            toDoItem.completed = true;
            toDoItem.save()
            .then((savedItem) => {
                res.json(savedItem);
            })
            .catch((err) => {
                console.error(err);
                res.json(err);  
            })
        })

});




module.exports = router;
