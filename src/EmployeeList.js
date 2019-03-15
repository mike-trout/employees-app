import React, { Component } from 'react';
import Employee from './Employee.js';
import './EmployeeList.css';

const http = require('http');

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            start: parseInt(props.start) || 1,
            number: parseInt(props.number) || 10
        };
    }

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees = () => {
        console.log("Getting employees...");
        http.get('/api/employees/?s=' + this.state.start + '&n=' + this.state.number, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log("Got employees.");
                this.setState({
                    employees: JSON.parse(data).employees
                });
            });
        }).on('error', (err) => {
            console.log('Error getting employees: ' + err.message);
        });
    }

    onNextButtonClick = () => {
        this.setState({ "start": this.state.start + this.state.number });
        this.getEmployees();
    }

    onPrevButtonClick = () => {
        if (this.state.start - this.state.number > 0) {
            this.setState({ "start": this.state.start - this.state.number });
            this.getEmployees();
        }
    }

    render() {
        const employees = this.state.employees.map((emp, i) => (
            <Employee key={i}
                personnelId={emp.personnelId}
                firstName={emp.firstName}
                middlename={emp.middleName}
                lastName={emp.lastName} />
        ));
        return (
            <div className="EmployeeList">
                <input className="EmployeeList__previous-button"
                    type="button"
                    value="<"
                    onClick={this.onPrevButtonClick}>
                </input>
                <div className="EmployeeList">
                    {employees}
                </div>
                <input className="EmployeeList__next-button"
                    type="button"
                    value=">"
                    onClick={this.onNextButtonClick}>
                </input>
            </div>
        );
    }
}

export default EmployeeList;
