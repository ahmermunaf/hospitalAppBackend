import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./store";
import {interceptor} from "./store/helper";

interceptor();

function Portal() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

ReactDOM.render(<Portal/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
