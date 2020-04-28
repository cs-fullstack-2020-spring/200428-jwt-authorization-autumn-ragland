import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Secret extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render () {
        if(this.props.token){
            return(
                <Fragment>
                    <h1>Secret for {this.props.token.name}</h1>
                </Fragment>
            )
        }
        return(
            <h1>You must log in to see the secret</h1>
        )
        
    }
}

export default Secret;