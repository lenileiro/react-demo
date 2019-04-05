import React, {Component} from 'react'
import {Helmet} from "react-helmet";
 
import style from "./hello.css"

class Hello extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <meta charSet="utf-8" />
                </Helmet>
                <h1 className="hello">hello page</h1> 
            </div>
        )
    }
}

export default Hello