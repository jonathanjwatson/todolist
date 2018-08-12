import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import {Checkbox} from 'react-bootstrap';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

moment().format('YYYY-MM-DD');

class ViewAll extends Component {

    constructor() {    
        super();
            this.state = {
                yesterdaysDate: moment().add(-1, 'days').format('MMM DD, YYYY'),
                todaysDate: moment().format('MMM DD, YYYY'),
                tomorrowsDate: moment().add(1, 'days').format('MMM DD, YYYY'),
                todaysTaskList: [
                    {
                        name: ''
                    }
                ]

            }
        }
    componentDidMount() {
        console.log(this.state.todaysDate);
        this.getTodaysTaskList();

    }
    _handleTaskComplete = (e) => {
        console.log(e.target);
        const id = e.target.id;
        const newState = this.state;
        newState.todaysTaskList[id].completed = true;
        this.setState(newState);
        const idToUpdate = newState.todaysTaskList[id]._id;

        axios.get(`/api/v1/taskUpdater/${idToUpdate}`)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        })
    }
    getTodaysTaskList = () => {
        axios.get(`/api/v1/dailyList/todaysDate?todaysDate=${this.state.todaysDate}`)
		.then((res) => {
            console.log(res);
            const newState = this.state;
            newState.todaysTaskList = res.data;
            this.setState(newState);
            console.log(this.state.todaysTaskList.length);
        })
        .catch((err) => {
            console.log(err)
        })
    }
  render() {
    return (
      <div className="row ViewAll">
        <div className="col-xs-4">
        {this.state.yesterdaysDate} 
        </div>
        <div className="col-xs-4">
        <div className="row">
        {this.state.todaysDate}
        </div>
        <div className="row">
        {this.state.todaysTaskList.map((singleTask, i) => (
            <div className="row" key={i}>
            <div className="col-lg-5">
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
            <Checkbox checked={this.state.todaysTaskList[i].completed} id={i} onChange={this._handleTaskComplete} className="left-align">{singleTask.name}</Checkbox>
            </div>
            </div>
        ))}
        </div>
        </div>
        <div className="col-xs-4">
        {this.state.tomorrowsDate}
        </div>

      </div>
    );
  }
}

export default ViewAll;
