import React from 'react';
import {Header, Footer} from "..";

const BodyWithHeaderAndFooter = (Element) => props => {
    return (
        <div className="header-with-body">
            <Header/>
            <div className="body">
                <Element {...props}/>
            </div>
            <Footer/>
        </div>
    );
}
export default BodyWithHeaderAndFooter
