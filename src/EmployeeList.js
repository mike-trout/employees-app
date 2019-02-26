import React, { Component } from 'react';
import Employee from './Employee.js';
import './EmployeeList.css';

const http = require('http');

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees = () => {
        console.log("Getting employees...");
        http.get('/services/employees', (resp) => {
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

    render() {
        const employees = this.state.employees.map((emp, i) => (
            <Employee key={i}
                personnelId={emp.personnelId}
                firstName={emp.firstName}
                middlename={emp.middleName}
                lastName={emp.lastName} />
        ));
        return (
            <div className="EmployeeList">{employees}</div>
        );
    }
}

export default EmployeeList;
