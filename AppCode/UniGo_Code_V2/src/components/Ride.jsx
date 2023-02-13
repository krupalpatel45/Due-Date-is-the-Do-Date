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

export default function Ride() {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ marginTop: '5%' }}>
            <h2>Welcome User!</h2>
            <Paper
                elevation={5}
                style={{
                    borderRadius: '10px',
                    height: '500px',
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
                            color='secondary'
                            style={{
                                borderRadius: '70px',
                                fontSize: '30px',
                                width: '70%',
                                height: '60px',
                            }}
                        >
                            Ride
                        </Button>
                        <Paper
                            elevation={5}
                            style={{
                                borderRadius: '10px',
                                width: '70%',
                                padding: '2%',
                                height: '300px',
                            }}
                        >
                            <div className='row'>
                                <div className='col'>
                                    <TextField
                                        id='standard-full-width'
                                        label='From'
                                        name='from'
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
                                        label='Cost'
                                        variant='outlined'
                                        disabled
                                        name='cost'
                                        autoComplete='off'
                                        required
                                        helperText='Estimated Cost'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <FontAwesomeIcon
                                                        icon={faDollarSign}
                                                        className='fa'
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col mt-3'>
                                    <TextField
                                        id='standard-full-width'
                                        label='To'
                                        name='to'
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
                                <div className='col mt-3'>
                                    <TextField
                                        id='standard-full-width'
                                        label='Duration'
                                        name='duration'
                                        variant='outlined'
                                        disabled
                                        autoComplete='off'
                                        required
                                        helperText='Estimated Duration'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <FontAwesomeIcon
                                                        icon={faClock}
                                                        className='fa'
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col mt-3'>
                                    <TextField
                                        id='standard-full-width'
                                        label='Passengers'
                                        name='passengers'
                                        autoComplete='off'
                                        type='number'
                                        required
                                        helperText='Passengers'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <FontAwesomeIcon
                                                        icon={faUserFriends}
                                                        className='fa'
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
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
