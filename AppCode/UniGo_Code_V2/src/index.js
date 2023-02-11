import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import $ from 'jquery'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { MyReducer } from './components/Reducer/myReducer'
import Router from './components/router'
import Login from './components/login'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

const middleWare = [thunk]
const store = createStore(MyReducer, composeWithDevTools(applyMiddleware(...middleWare)))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

// setting before deploying
// //"start": "serve -s build",

serviceWorker.register()
