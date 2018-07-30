import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, Button, Checkbox } from 'react-bootstrap';


class NewToDoListItem extends Component {
    constructor() {    
    super();
        this.state = {
            name: '',
            description: '',
            dailyItem: false,
            dateDue: '',
            mondayTask: false,
            tuesdayTask: false,
            wednesdayTask: false,
            thursdayTask: false,
            fridayTask: false,
            saturdayTask: false,
            sundayTask: false,
            completed: false,
            isDailyItem: false,
            isRepeateItem: false,
            isSpecificDateItem: false
        }};

    _handleChange = (e) => {
        const attributeName = e.target.name;
        const attributeValue = e.target.value;
        const newState = {...this.state};
        newState[attributeName] = attributeValue;
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
    }
    _toggleDaily = (e) => {
        e.preventDefault();
        const newState = {...this.state};
        newState.isDailyItem = !newState.isDailyItem;
        newState.dailyItem = !newState.dailyItem;
        this.setState(newState);
    }
    _toggleRepeat = (e) => {
        e.preventDefault();
        const newState = {...this.state};
        newState.isRepeateItem = !newState.isRepeateItem;
        this.setState(newState);
    }
    _toggleRepeatDays = (e) => {
        console.log(e.target);
        const attributeName = e.target.name;
        const newState = {...this.state};
        newState[attributeName] = !newState[attributeName];
        this.setState(newState);
    }
    render() {
        return (
            <div className="col-sm-4 col-min-width">
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
                            {this.state.isDailyItem && <p>Submit New Daily Item</p>}
                            <Button onClick={this._toggleDaily}>Daily Item</Button>
                        </div>
                        <div>
                            {this.state.isRepeateItem && 
                            <div>
                                <p>Select Which Days this Repeats</p>
                                <FormGroup>
                                    <Checkbox inline checked={this.state.mondayTask} name="mondayTask" onChange={this._toggleRepeatDays} >Monday</Checkbox>
                                    <Checkbox inline checked={this.state.tuesdayTask} name="tuesdayTask" onChange={this._toggleRepeatDays}>Tuesday</Checkbox>
                                    <Checkbox inline checked={this.state.wednesdayTask} name="wednesdayTask" onChange={this._toggleRepeatDays}>Wednesday</Checkbox>
                                    <Checkbox inline checked={this.state.thursdayTask} name="thursdayTask" onChange={this._toggleRepeatDays}>Thursday</Checkbox>
                                    <Checkbox inline checked={this.state.fridayTask} name="fridayTask" onChange={this._toggleRepeatDays}>Friday</Checkbox>
                                    <Checkbox inline checked={this.state.saturdayTask} name="saturdayTask" onChange={this._toggleRepeatDays}>Saturday</Checkbox>
                                    <Checkbox inline checked={this.state.sundayTask} name="sundayTask" onChange={this._toggleRepeatDays}>Sunday</Checkbox>
                                </FormGroup>
                                </div>
                            }
                            <Button onClick={this._toggleRepeat}>Repeat this Item</Button>

                        </div>
                        </div>
                        <div>
                        
                        </div>
                        
                        
                        <Button>Specific Date</Button>
                        <div>
                        <Button type="submit">Submit</Button>
                        </div>
                        
                    </FormGroup>
                </Form>
            </div>
        );
    }
}



export default NewToDoListItem;