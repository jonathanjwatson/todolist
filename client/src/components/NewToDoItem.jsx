import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, Button, Checkbox, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

moment().format('YYYY-MM-DD');


class NewToDoListItem extends Component {
    constructor() {    
    super();
        this.state = {
            name: '',
            description: '',
            dailyItem: false,
            dateDue: null,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            completed: false,
            taskType: "isSporadicTask",
            showRepeatItemMenu: false,
            showDatePicker: false,

        }};
    cancelRepeat = (e) => {
        e.preventDefault();
        const newState = this.state;
        newState.monday = false;
        newState.tuesday = false;
        newState.wednesday = false;
        newState.thursday = false;
        newState.friday = false;
        newState.saturday = false;
        newState.sunday = false;
        newState.showRepeatItemMenu = !newState.showRepeatItemMenu;
        this.setState(newState);
    };
    clickTheRightBoxes = () => {
        if (this.state.taskType === "isDailyTask"){
            const newState = this.state;
            newState.monday = true;
            newState.tuesday = true;
            newState.wednesday = true;
            newState.thursday = true;
            newState.friday = true;
            newState.saturday = true;
            newState.sunday = true;
            this.setState(newState);
        } else if (this.state.taskType === "isWeekdayTask"){
            const newState = this.state;
            newState.monday = true;
            newState.tuesday = true;
            newState.wednesday = true;
            newState.thursday = true;
            newState.friday = true;
            newState.saturday = false;
            newState.sunday = false;
            this.setState(newState);
        } else if (this.state.taskType === "isWeekendTask"){
            const newState = this.state;
            newState.monday = false;
            newState.tuesday = false;
            newState.wednesday = false;
            newState.thursday = false;
            newState.friday = false;
            newState.saturday = true;
            newState.sunday = true;
            this.setState(newState);
        }  else if (this.state.taskType === "isSporadicTask"){
            const newState = this.state;
            newState.monday = false;
            newState.tuesday = false;
            newState.wednesday = false;
            newState.thursday = false;
            newState.friday = false;
            newState.saturday = false;
            newState.sunday = false;
            this.setState(newState);
        } else{
            alert("There was an issue making your selection. Please try again");
        }
    };
    _handleChange = (e) => {
        const attributeName = e.target.name;
        const attributeValue = e.target.value;
        const newState = {...this.state};
        newState[attributeName] = attributeValue;
        this.setState(newState);
    };
    _handleDateChange = (date) => {
        console.log(date);
        const newState = {...this.state};
        newState.dateDue = date;
        this.setState(newState);
    };
    _handleSubmit = (e) => {
		e.preventDefault();
		const payload = {...this.state};
		axios.post(`/api/v1/taskCreator/create`, payload)
		.then((res) => {
            console.log(res);
            alert("Yup!");

        })
        .catch((err) => {
            console.log(err)
        })
    };
    _handleToggleChange = async (e) => {
        console.log(e);
        await this.setState({taskType: e});
        await this.clickTheRightBoxes();
    };
    _toggleDatePicker =(e) => {
        e.preventDefault();
        const newState = {...this.state};
        newState.showDatePicker = !newState.showDatePicker;
        this.setState(newState);
    };
    _toggleRepeat = (e) => {
        e.preventDefault();
        const newState = {...this.state};
        newState.showRepeatItemMenu = !newState.showRepeatItemMenu;
        this.setState(newState);
    };
    _toggleRepeatDays = (e) => {
        console.log(e.target);
        const attributeName = e.target.name;
        const newState = {...this.state};
        newState[attributeName] = !newState[attributeName];
        newState.taskType = "isSporadicTask";
        this.setState(newState);
    };

    render() {
        return (
            <div className="col-sm-4 col-md-offset-4 col-min-width">
                <Form onSubmit={this._handleSubmit}>
                    <FormGroup>
                        <h3 style={{color: 'white'}}> Add new To Do Item </h3>
                        <div>
                            <FormControl 
                                type="text"
                                onChange={this._handleChange}
                                value={this.state.name}
                                name='name'
                                placeholder="Name"
                            />
                        </div>
                        <div>
                        <FormControl 
                            type="text"
                            onChange={this._handleChange}
                            value={this.state.description}
                            name='description'
                            placeholder="Description"
                        />
                        <div>
                            {this.state.showRepeatItemMenu && 
                            <div className="row">
                                <ToggleButtonGroup type="radio" name="options" value={this.state.taskType} onChange={this._handleToggleChange}>
                                    <ToggleButton inline="true" value="isDailyTask" >Daily Task</ToggleButton>
                                    <ToggleButton inline="true" value="isWeekdayTask" >Weekday Task</ToggleButton>
                                    <ToggleButton inline="true" value="isWeekendTask" >Weekend Task</ToggleButton>
                                    <ToggleButton inline="true" value="isSporadicTask" >Sporadic Task</ToggleButton>
                                </ToggleButtonGroup>
                                <p>Select Which Days this Repeats</p>
                                <FormGroup>
                                    <Checkbox inline checked={this.state.monday} name="monday" onChange={this._toggleRepeatDays} >Monday</Checkbox>
                                    <Checkbox inline checked={this.state.tuesday} name="tuesday" onChange={this._toggleRepeatDays}>Tuesday</Checkbox>
                                    <Checkbox inline checked={this.state.wednesday} name="wednesday" onChange={this._toggleRepeatDays}>Wednesday</Checkbox>
                                    <Checkbox inline checked={this.state.thursday} name="thursday" onChange={this._toggleRepeatDays}>Thursday</Checkbox>
                                    <Checkbox inline checked={this.state.friday} name="friday" onChange={this._toggleRepeatDays}>Friday</Checkbox>
                                    <Checkbox inline checked={this.state.saturday} name="saturday" onChange={this._toggleRepeatDays}>Saturday</Checkbox>
                                    <Checkbox inline checked={this.state.sunday} name="sunday" onChange={this._toggleRepeatDays}>Sunday</Checkbox>
                                </FormGroup>
                                <Button bsStyle="warning" onClick={this.cancelRepeat}>Cancel Repeat Task Selection</Button>
                                </div>
                            }
                            {this.state.showDatePicker && 
                            <div className="row">
                                <p>This is my datepicker</p>
                                <DatePicker
                                    // dateFormat="YYYY-MM-DD"
                                    selected={this.state.dateDue}
                                    onChange={this._handleDateChange}
                                    isClearable={true}
                                />
                                <Button bsStyle="warning" onClick={this._toggleDatePicker}>Cancel Date Picker</Button>
                            </div>
                            }
                            {!this.state.showDatePicker && !this.state.showRepeatItemMenu && 
                            <div className="row">
                                <Button  onClick={this._toggleRepeat}>Repeat this Item</Button>
                                <Button onClick={this._toggleDatePicker}>Specific Date</Button>
                            </div>  
                            }
                        </div>
                        </div>
                        <div>
                        
                        </div>
                        
                        
                        
                        <div className="row">
                        <Button type="submit" bsStyle="primary">Submit</Button>
                        </div>
                        
                    </FormGroup>
                </Form>
            </div>
        );
    }
}



export default NewToDoListItem;