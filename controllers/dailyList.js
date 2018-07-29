const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');

const DailyList = require("../models/dailyList");

router.get("/", (req, res) => {
    // Create date from input value
    // const inputDate = new Date("11/21/2011");

    // Get today's date
    var todaysDate = new Date();
    todaysDate.setHours(0,0,0,0);

    // call setHours to take the time out of the comparison
    
    // console.log(req.body);
    // console.log(todaysDate);
        DailyList.find().then(dailyListResults => {
            // console.log(dailyListResults);

            let resultsToReturn = dailyListResults.filter(singleResult => {
                console.log("===============SINGLE TEST RESULT=============")
                console.log(singleResult);
                console.log(typeof(singleResult.todaysDate));
                console.log(typeof(todaysDate));
                console.log(singleResult.todaysDate.toString() == todaysDate.toString());
                return singleResult.todaysDate.toString() == todaysDate.toString();
            });
            console.log(resultsToReturn);
            // if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
                
            // }
            res.json(resultsToReturn);
        })
});


module.exports = router;
