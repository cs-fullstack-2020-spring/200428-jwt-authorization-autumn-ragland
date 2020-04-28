import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Secret from './Secret';

class AppContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            token : "",
        }
    }

    logInUser = async (token) => {
        // console.log(token);
        let response = await fetch('/users/secret', {
            method : "POST",
            headers : {
                "Authorization" : token
            },
        });
        let json = await response.json();
        console.log(json.message);
        this.setState({token : json.message});
    }

    logoutUser = () => {
        this.setState({token : ""})
    }

    render () {
        return(
            <Fragment>
                <h1>Authentication</h1>
                <Router>
                    <Link to="/">Home</Link>
                    <Link onClick = {this.logoutUser} to="/">Logout</Link>
                    <Link to ="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/secret">Secret</Link>
                    <Route path="/login" component = {() => <Login logInUser = {this.logInUser}/>} />
                    <Route path="/register" component = {Register} />
                    <Route path="/secret" component = {() => <Secret token = {this.state.token}/>} />
                </Router>
            </Fragment>
        )
    }
}

export default AppContainer;