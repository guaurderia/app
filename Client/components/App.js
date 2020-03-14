import React, { Component } from 'react';
import Header from './Header';
import OwnerManager from './Owners/OwnerManager';

export default class App extends Component {

    constructor(){
        super();

        this.state = {
            title: 'Guaurderia APP',
            description: 'A basic template that consists of the essential elements that are required to start building a React application'
        };
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container mt-5">
                    {/* <OwnerManager /> */}
                </div>
            </div>
        );
    }
}