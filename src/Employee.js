import React, { Component } from 'react';
import './Employee.css';

const http = require('http');

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            personnelId: props.personnelId,
            firstName: props.firstName,
            middleName: props.middleName,
            lastName: props.lastName,
            gender: "Updating...",
            dateOfBirth: "Updating...",
            addressLine1: "Updating...",
            addressLine2: "Updating..."
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.collapsed === true && this.state.collapsed === false) {
            this.getEmployeeDetails();
        }
    }

    getEmployeeDetails = () => {
        console.log("Getting employee details for " + this.state.personnelId);
        http.get('/api/employees/' + this.state.personnelId, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log("Got " + data + " for personnel ID " + this.state.personnelId);
                let employee = JSON.parse(data).employee;
                this.setState({
                    gender: employee.gender,
                    dateOfBirth: employee.dateOfBirth,
                    addressLine1: employee.addressLine1,
                    addressLine2: employee.addressLine2
                });
            });
        }).on('error', (err) => {
            console.log('Error: ' + err.message);
        });
    }

    onExpandCollapseClick = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    }

    render() {
        return (
            <div className="Employee">
                <span className="Employee__title">
                    {(this.state.personnelId || "") + " : "
                        + (this.state.firstName || "") + " "
                        + (this.state.middleName || "") + " "
                        + (this.state.lastName || "")}
                </span>
                <span className="Employee__expand-collapse"
                    onClick={this.onExpandCollapseClick}>
                    {this.state.collapsed ? "+" : "\u2013"}
                </span>
                <span className={"Employee__content" + (this.state.collapsed ? "--collapsed" : "")}>
                    {"Gender: " + (this.state.gender || "")}
                    <br />
                    {"Date of Birth: " + (this.state.dateOfBirth || "")}
                    <br />
                    {"Address Line 1: " + (this.state.addressLine1 || "")}
                    <br />
                    {"Address Line 2: " + (this.state.addressLine2 || "")}
                </span>
            </div>
        );
    }
}

export default Employee;
