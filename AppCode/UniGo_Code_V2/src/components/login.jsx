import React, { Component } from 'react'
import {
    faInfinity,
    faUser,
    faUnlock,
    faSignInAlt,
    faShoppingCart,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom'

// use of MATERIAL UI
import {
    Button,
    Paper,
    TextField,
    Grid,
    makeStyles,
    InputAdornment,
    InputLabel,
    Snackbar,
    Fab,
} from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import MuiAlert from '@material-ui/lab/Alert'
import Cookies from 'universal-cookie'

import DriveRide from './DriveRide'
import Footer from './Footer'

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles({
    root: {
        padding: '10px 20px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 1,
    },
})

export default function Login() {
    function handleLogin() {
        const cookies = new Cookies()
        cookies.set('username', 'Yash')
    }
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ marginTop: '5%' }}>
            <Paper
                elevation={5}
                style={{
                    borderRadius: '10px',
                    height: '500px',
                    width: '50%',
                    paddingTop: '2%',
                    padding: '2%',
                }}
            >
                <center>
                    <h3>Login</h3>
                </center>
                <form
                    style={{
                        padding: '20px',
                    }}
                >
                    <div className='form'>
                        <TextField
                            id='standard-full-width'
                            label='Username'
                            name='email'
                            autoComplete='off'
                            required
                            helperText='Please Enter your Username'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FontAwesomeIcon icon={faUser} className='fa' />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className='form'>
                        <TextField
                            type='password'
                            id='standard-adornment-password'
                            label='Password'
                            name='password'
                            autoComplete='off'
                            required
                            helperText='Please Enter your Password'
                            fullWidth
                            style={{ marginTop: 12 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FontAwesomeIcon icon={faUnlock} className='fa' />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <center>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    paddingTop: '5%',
                                }}
                            >
                                <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                                    <Button
                                        type='submit'
                                        variant='outlined'
                                        color='primary'
                                        style={{
                                            marginTop: '10px',
                                            padding: '20px',
                                            width: '200px',
                                        }}
                                        size='large'
                                    >
                                        {'  '}
                                        <b>Go Back</b>
                                    </Button>
                                </Link>
                                <Link to='/main' style={{ color: 'black', textDecoration: 'none' }}>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        onClick={handleLogin}
                                        style={{
                                            marginTop: '10px',
                                            padding: '20px',
                                            width: '200px',
                                        }}
                                        size='large'
                                    >
                                        <ExitToApp />
                                        {'  '}
                                        <b>LOGIN</b>
                                    </Button>
                                </Link>
                            </div>
                        </center>
                    </div>
                </form>
            </Paper>
        </div>
    )
}
