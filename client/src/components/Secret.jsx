import React, { Component, Fragment } from "react";
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom' // imports to use Router

class Secret extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.token){   
        return(
            <Fragment>
                <h1>Super Secret Page for Logged in Users</h1>
                {this.props.token.name}
            </Fragment>
        )}
        return(
            <Fragment>
                <h1>Please Log In</h1>
            </Fragment>
        )
    }
}
export default Secret;