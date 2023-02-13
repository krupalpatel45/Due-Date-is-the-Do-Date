import React, { Component } from 'react'
import {
    faInfinity,
    faUser,
    faUnlock,
    faSignInAlt,
    faShoppingCart,
    faCheckCircle,
    faPhone,
    faEnvelope,
    faLocationArrow,
    faDollarSign,
    faClock,
    faUserFriends,
    faCross,
    faPhoneAlt,
    faCheck,
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

export default function Drive() {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ marginTop: '5%' }}>
            <h2>Welcome Driver!</h2>
            <Paper
                elevation={5}
                style={{
                    borderRadius: '10px',
                    height: '600px',
                    width: '60%',
                    padding: '2%',
                }}
            >
                <div className='row'>
                    <div
                        className='col-7'
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            style={{
                                borderRadius: '70px',
                                fontSize: '30px',
                                width: '70%',
                                height: '60px',
                            }}
                        >
                            Drive
                        </Button>
                        <Paper
                            elevation={5}
                            className='mt-2'
                            style={{
                                borderRadius: '10px',
                                width: '70%',
                                padding: '2%',
                            }}
                        >
                            <div className='row'>
                                <div className='col'>
                                    <TextField
                                        id='standard-full-width'
                                        label='From'
                                        name='from'
                                        disabled
                                        variant='outlined'
                                        autoComplete='off'
                                        required
                                        helperText='From'
                                        fullWidth
                                        value='Toronto Pearson International Airport'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <FontAwesomeIcon
                                                        icon={faLocationArrow}
                                                        className='fa'
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className='col'>
                                    <TextField
                                        id='standard-full-width'
                                        label='To'
                                        name='to'
                                        disabled
                                        variant='outlined'
                                        autoComplete='off'
                                        required
                                        value='Stanley Park'
                                        helperText='To'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <FontAwesomeIcon
                                                        icon={faLocationArrow}
                                                        className='fa'
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className='row'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    style={{
                                        borderRadius: '50px',
                                        fontSize: '10px',
                                        width: '20%',
                                        height: '40px',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPhoneAlt} className='fa' />
                                    Reject
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    style={{
                                        borderRadius: '50px',
                                        fontSize: '10px',
                                        width: '20%',
                                        height: '40px',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} className='fa' />
                                    Accept
                                </Button>
                            </div>
                        </Paper>
                        <Paper
                            elevation={5}
                            className='mt-2'
                            style={{
                                borderRadius: '10px',
                                width: '70%',
                                padding: '2%',
                            }}
                        >
                            <div className='row'>
                                <div className='col'>
                                    <TextField
                                        id='standard-full-width'
                                        label='From'
                                        name='from'
                                        disabled
                                        variant='outlined'
                                        autoComplete='off'
                                        required
                                        helperText='From'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <FontAwesomeIcon
                                                        icon={faLocationArrow}
                                                        className='fa'
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className='col'>
                                    <TextField
                                        id='standard-full-width'
                                        label='To'
                                        name='to'
                                        disabled
                                        variant='outlined'
                                        autoComplete='off'
                                        required
                                        helperText='To'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <FontAwesomeIcon
                                                        icon={faLocationArrow}
                                                        className='fa'
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className='row'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant='contained'
                                    className='mt-2'
                                    color='secondary'
                                    style={{
                                        borderRadius: '50px',
                                        fontSize: '10px',
                                        width: '20%',
                                        height: '40px',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPhoneAlt} className='fa' /> Reject
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    style={{
                                        borderRadius: '50px',
                                        fontSize: '10px',
                                        width: '20%',
                                        height: '40px',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} className='fa' /> Accept
                                </Button>
                            </div>
                        </Paper>
                    </div>
                    <div className='col-5'>
                        <div className='col'>
                            <img
                                src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg'
                                alt='Map'
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
