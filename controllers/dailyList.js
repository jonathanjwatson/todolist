const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require('axios');
const moment = require('moment');

const DailyList = require("../models/dailyList");
const ToDo = require('../models/toDoItem');

// router.get("/todaysDate", (req, res) => {
//     var todaysDate = new Date();
//     todaysDate.setHours(0,0,0,0);
//     console.log(todaysDate);

//     DailyList.find().then(dailyListResults => {
//         console.log(dailyListResults);
//         let resultsToReturn = dailyListResults.filter(singleResult => {
            
//             console.log(Date.parse(singleResult.todaysDate));
//             console.log(Date.parse(todaysDate));
//             console.log(singleResult.todaysDate.toString() == todaysDate.toString());
//             var offset = todaysDate.getTimezoneOffset() * 60 * 1000;
//             console.log(offset);
//             return Date.parse(singleResult.todaysDate) == (Date.parse(todaysDate) - offset);
//         });
//         console.log(resultsToReturn);
//         res.json(resultsToReturn);
//     }).catch(err => {
//         console.error(err);
//     });
// });

// router.get("/:searchDate?", (req, res) => {
//     console.log(req.params);
//     var searchDate = req.params.searchDate;
//     var searchDateArray = searchDate.split("-");
//     console.log(searchDateArray)
//     var todaysDate = new Date(Date.UTC(searchDateArray[0], searchDateArray[1] - 1, searchDateArray[2], 0, 0.0));
//     // var todaysDate = new Date(searchDateArray[0], searchDateArray[1], searchDateArray[2], 0, 0);
//     // todaysDate.setHours(0,0,0,0);
//     console.log(todaysDate);

//     DailyList.find().then(dailyListResults => {
//         console.log(dailyListResults);
//         let resultsToReturn = dailyListResults.filter(singleResult => {
//             console.log(Date.parse(singleResult.todaysDate) == (Date.parse(todaysDate)));
            
//             return Date.parse(singleResult.todaysDate) == (Date.parse(todaysDate));
//         });
//         console.log(resultsToReturn);
//         res.json(resultsToReturn);
//     }).catch(err => {
//         console.error(err);
//     })
// });

router.get("/todaysDate", (req, res) => {
    var todaysDate = req.query.todaysDate;
    todaysDate = moment(todaysDate).utc().hour(0).minutes(0).seconds(0).milliseconds(0);
    // moment(todaysDate).utc();
    // todaysDate.hour(0).minutes(0).seconds(0);
    console.log("Today's Date", todaysDate);

    ToDo.find()
    .then((results) => {
         const resultsToReturn = results.filter((result) => {

            return moment(result.dateDue).isSame(todaysDate);
        });
        // console.log(results);
        res.json(resultsToReturn);
    })
    .catch((err) => {
        console.error(err);
    })

    // DailyList.find().then(dailyListResults => {
    //     console.log(dailyListResults);
    //     res.json(todaysDate);
    // }).catch(err => {
    //     console.error(err);
    // });
});

router.get("/:searchDate?", (req, res) => {
    console.log(req.params);
    var searchDate = req.params.searchDate;
    var searchDateArray = searchDate.split("-");
    console.log(searchDateArray)
    var todaysDate = new Date(Date.UTC(searchDateArray[0], searchDateArray[1] - 1, searchDateArray[2], 0, 0.0));
    // var todaysDate = new Date(searchDateArray[0], searchDateArray[1], searchDateArray[2], 0, 0);
    // todaysDate.setHours(0,0,0,0);
    console.log(todaysDate);

    DailyList.find().then(dailyListResults => {
        console.log(dailyListResults);
        let resultsToReturn = dailyListResults.filter(singleResult => {
            console.log(Date.parse(singleResult.todaysDate) == (Date.parse(todaysDate)));
            
            return Date.parse(singleResult.todaysDate) == (Date.parse(todaysDate));
        });
        console.log(resultsToReturn);
        res.json(resultsToReturn);
    }).catch(err => {
        console.error(err);
    })
});



module.exports = router;
