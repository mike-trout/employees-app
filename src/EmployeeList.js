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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.number !== this.state.number || prevState.start !== this.state.start) {
            this.getEmployees();
        }
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
        this.setState(prevState => ({
            start: prevState.start + prevState.number
        }));
    }

    onPrevButtonClick = () => {
        if (this.state.start - this.state.number > 0) {
            this.setState(prevState => ({
                start: prevState.start - prevState.number
            }));
        }
    }

    render() {
        const employees = this.state.employees.map((emp, i) => (
            <Employee key={emp.personnelId}
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
                <div className="EmployeeList__list">
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
