import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        }
    }

    handleChange = (event) => {
        if(event.target.name === "email"){
            this.setState({email : event.target.value});
        } if(event.target.name === "password"){
            this.setState({password : event.target.value});
        }
    }

    handleSubmission = async (event) => {
        event.preventDefault();
        // console.log(this.state);
        let user = {
            email : this.state.email,
            password : this.state.password
        }

        let response = await fetch('/users/login', {
            method : "POST",
            headers :{
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        });
        let json = await response.json();
        // console.log(json);
        this.props.logInUser(json.token);
    }

    render () {
        return(
            <Fragment>
                <h1>Login</h1>
                <form>

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={this.state.email} onChange = {this.handleChange}/>
                    <br/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={this.state.password} onChange = {this.handleChange}/>
                    <br/>

                    <button onClick = {this.handleSubmission}>Submit</button>
                </form>
            </Fragment>
        )
    }
}

export default Login;