import React, { Component } from 'react'
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom'
import Login from './login'
import qLogo from '../q.svg'
import NavBar from './navbar'

import EntryForm from './EntryForm'
import Register from './Register'
import MainPage from './MainPage'
import Drive from './Drive'
import Ride from './Ride'
import UserProfile from './UserProfile'
import Vehicles from './Vehicles'
import DriveHistory from './DriveHistory'

class Router extends Component {
    state = { user: '', localId: '', tokenId: '' }
    handleOnLogin = (tokenID, localID, user) => {
        this.setState({ localId: localID, tokenId: tokenID, user: user })
    }
    render() {
        return (
            <div>
                <NavBar user={this.state.user} />

                <Route
                    path='/login'
                    exact
                    render={props => (
                        <Login
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />
                <Route
                    path='/register'
                    exact
                    render={props => (
                        <Register
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />

                <Route
                    path='/main'
                    exact
                    render={props => (
                        <MainPage
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />

                <Route
                    path='/drive'
                    exact
                    render={props => (
                        <Drive
                            {...props}
                            user={'Yash'}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />
                <Route
                    path='/ride'
                    exact
                    render={props => (
                        <Ride
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />

                <Route
                    path='/userProfile'
                    exact
                    render={props => (
                        <UserProfile
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />
                <Route
                    path='/vehicles'
                    exact
                    render={props => (
                        <Vehicles
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />

                <Route
                    path='/driveHistory'
                    exact
                    render={props => (
                        <DriveHistory
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />

                <Route
                    path='/'
                    exact
                    render={props => (
                        <EntryForm
                            {...props}
                            user={this.state.user}
                            onLogin={this.handleOnLogin}
                            key={Math.floor(Math.random() * 10)}
                        />
                    )}
                />
            </div>
        )
    }
}

export default Router
