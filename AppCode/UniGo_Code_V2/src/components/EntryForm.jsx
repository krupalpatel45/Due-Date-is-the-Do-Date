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

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '90vh',
    },
}))

const useStyles2 = makeStyles({
    root: {
        padding: '10px 20px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        flexDirection: 'column',
    },
})

export default function EntryForm() {
    const classes2 = useStyles()
    const classes = useStyles2()
    return (
        <div>
            <div className={classes2.root}>
                <DriveRide />
                <Paper
                    className={classes.root}
                    elevation={5}
                    style={{
                        borderRadius: '10px',
                        padding: '20px',
                        height: '500px',
                    }}
                >
                    <div>
                        <Link to='/register' style={{ color: 'black', textDecoration: 'none' }}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                style={{ marginTop: '10px', padding: '20px', width: '200px' }}
                                size='large'
                            >
                                {'  '}
                                <b>Ride With Us</b>
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Link to='/login' style={{ color: 'black', textDecoration: 'none' }}>
                            <Button
                                type='submit'
                                variant='outlined'
                                color='primary'
                                style={{ marginTop: '10px', padding: '20px', width: '200px' }}
                                size='large'
                            >
                                {'  '}
                                <b>SignIn</b>
                            </Button>
                        </Link>
                    </div>
                </Paper>
            </div>
        </div>
    )
}
