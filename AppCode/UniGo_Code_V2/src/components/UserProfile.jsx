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
    Avatar,
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

export default function UserProfile() {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ marginTop: '5%' }}>
            <Paper
                elevation={5}
                style={{
                    borderRadius: '10px',
                    height: '500px',
                    width: '50%',
                    padding: '2%',
                }}
            >
                <center>
                    <h3>User Profile</h3>
                </center>
                <div className='row'>
                    <div className='col-5'>
                        <div className='form'>
                            <TextField
                                id='standard-full-width'
                                label='FirstName'
                                name='first'
                                autoComplete='off'
                                required
                                value='Yash'
                                helperText='Please Enter your First Name'
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
                        <div className='form' style={{ marginTop: '3%' }}>
                            <TextField
                                id='standard-full-width'
                                label='LastName'
                                name='last'
                                value='Patel'
                                autoComplete='off'
                                required
                                helperText='Please Enter your Last Name'
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
                        <div className='form' style={{ marginTop: '3%' }}>
                            <TextField
                                id='standard-full-width'
                                label='Contact'
                                name='contact'
                                autoComplete='off'
                                required
                                value='+1-777-777-777'
                                helperText='Please Enter your Contact Number'
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <FontAwesomeIcon icon={faPhone} className='fa' />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='form' style={{ marginTop: '3%' }}>
                            <TextField
                                id='standard-full-width'
                                label='Email'
                                name='email'
                                autoComplete='off'
                                required
                                value='yash@ucregina.ca'
                                helperText='Please Enter your University Email'
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <FontAwesomeIcon icon={faEnvelope} className='fa' />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='form' style={{ marginTop: '3%' }}>
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
                        </div>
                    </div>
                    <div className='col-7'>
                        <div className='row'>
                            <div
                                className='col'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className='fa'
                                    style={{ fontSize: '100px' }}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div
                                className='col'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                Rides
                                <Avatar
                                    style={{
                                        padding: '20px',
                                        backgroundColor: '#2E3B55',
                                        fontSize: '15px',
                                    }}
                                    className='mt-2 ml-2'
                                >
                                    <b>12</b>
                                </Avatar>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div
                                className='col'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Fab
                                    variant='extended'
                                    disabled
                                    color='primary'
                                    onClick={() => this.handleAddQuestion()}
                                >
                                    <b>Driver</b>
                                </Fab>
                            </div>
                        </div>

                        <div
                            className='row'
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                paddingTop: '5%',
                            }}
                        >
                            <div
                                className='col'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Link
                                    to='/vehicles'
                                    style={{ color: 'black', textDecoration: 'none' }}
                                >
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        style={{
                                            marginTop: '10px',
                                            padding: '20px',
                                            width: '200px',
                                        }}
                                        size='large'
                                    >
                                        <ExitToApp />
                                        {'  '}
                                        <b>Vehicles</b>
                                    </Button>
                                </Link>
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
                                        <b>Preferences</b>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
