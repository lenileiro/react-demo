import React, {Component} from 'react'
import {Helmet} from "react-helmet";
import Wrapper from "./Wrapper"


class Hello extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <meta charSet="utf-8" />
                </Helmet>
                <Wrapper>
                 <h1 className="hello">Hello page</h1>
                </Wrapper>
                <p>lorem text</p>
            </div>
        )
    }
}

export default Hello