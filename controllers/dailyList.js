const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');

const DailyList = require("../models/dailyList");

router.get("/todaysDate", (req, res) => {
    var todaysDate = new Date();
    todaysDate.setHours(0,0,0,0);
    console.log(todaysDate);

    DailyList.find().then(dailyListResults => {
        console.log(dailyListResults);
        let resultsToReturn = dailyListResults.filter(singleResult => {
            
            console.log(Date.parse(singleResult.todaysDate));
            console.log(Date.parse(todaysDate));
            console.log(singleResult.todaysDate.toString() == todaysDate.toString());
            var offset = todaysDate.getTimezoneOffset() * 60 * 1000;
            console.log(offset);
            return Date.parse(singleResult.todaysDate) == (Date.parse(todaysDate) - offset);
        });
        console.log(resultsToReturn);
        res.json(resultsToReturn);
    }).catch(err => {
        console.error(err);
    });
});

router.get("/:searchDate*?", (req, res) => {
    var todaysDate = new Date();
    todaysDate.setHours(0,0,0,0);
    console.log(todaysDate);
});



module.exports = router;
