import React, { Component, Fragment } from "react";
import Login from "./Login";
import Register from "./Register";
import Secret from "./Secret";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom' // imports to use Router


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : "",
        }
    }

    // componentDidMount(){
    //     this.checkIfLoggedInUser();
    // }

    logoutUser = () => {
        this.setState({token : ""});
    }

    // when form is submitted read user from database
    checkIfLoggedInUser = async (token) => {
        // fetch server endpoint 
        let response = await fetch('/users/secret', {
            method: "POST",
            headers: {
                'Authorization' : token
            },
        });
        // pull out json from response
        let json = await response.json();
        // log json response from server
        // if (json.error) {
        //     window.alert(json.error)
        // }
        console.log(json.message);
        this.setState({token : json.message});
        console.log(this.state.token);
    }

    render() {
        return (
            <Fragment>
                <h1>Authentication with Passport and JSON Web Tokens</h1>
                <Router>
                    <Link to="/">Home</Link> |
                    <Link to="/login">Login</Link> |
                    <Link to = "/" onClick = {this.logoutUser}>Logout</Link> |
                    <Link to="/register">Registration</Link> |
                    <Link to="/secret">Secret</Link>
                    <Route path="/login" component={ () => <Login auth = {this.checkIfLoggedInUser} /> } />
                    <Route path="/register" component={Register} />
                    <Route path="/secret" component={ () => <Secret token = {this.state.token} /> } />
                </Router>
            </Fragment>
        )
    }
}
export default AppContainer;