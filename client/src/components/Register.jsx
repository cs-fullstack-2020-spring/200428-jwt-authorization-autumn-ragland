import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
        }
    }

    handleChange = (event) => {
        if (event.target.name === "email") {
            this.setState({ email: event.target.value });
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value });
        }  else if (event.target.name === "name") {
            this.setState({ name: event.target.value });
        }
    }

    handleSubmission = async (event) => {
        event.preventDefault();
        // console.log(this.state);
        let newUser = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
        }

        let response = await fetch('/users/register', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
        let json = await response.json();
        console.log(json);
    }

    render() {
        return (
            <Fragment>
                <h1>Register</h1>
                <form>

                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                    <br />

                    <button onClick={this.handleSubmission}>Submit</button>
                </form>
            </Fragment>
        )
    }
}

export default Register;