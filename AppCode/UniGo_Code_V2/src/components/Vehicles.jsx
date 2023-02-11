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
    faTrash,
    faPen,
    faCar,
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

export default function Vehicles() {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ marginTop: '5%' }}>
            <h2>Vehicles</h2>
            <Paper
                elevation={5}
                style={{
                    borderRadius: '10px',
                    height: '600px',
                    width: '75%',
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
                            Current Vehicles
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
                                <div className='col'></div>
                                <div className='col'>Name</div>
                                <div className='col'>Rides</div>
                            </div>
                            <div className='row'>
                                <div className='col'>1</div>
                                <div className='col'>Toyota Camry</div>
                                <div className='col'>2</div>
                            </div>
                            <div
                                className='row mt-2'
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
                                    <FontAwesomeIcon icon={faTrash} className='fa' />
                                    Remove
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
                                    <FontAwesomeIcon icon={faPen} className='fa' />
                                    Edit
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
                                <div className='col'></div>
                                <div className='col'>Name</div>
                                <div className='col'>Rides</div>
                            </div>
                            <div className='row'>
                                <div className='col'>2</div>
                                <div className='col'>Honda Civic</div>
                                <div className='col'>10</div>
                            </div>
                            <div
                                className='row mt-2'
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
                                    <FontAwesomeIcon icon={faTrash} className='fa' />
                                    Remove
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
                                    <FontAwesomeIcon icon={faPen} className='fa' />
                                    Edit
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
                                <div className='col'></div>
                                <div className='col'>Name</div>
                                <div className='col'>Rides</div>
                            </div>
                            <div className='row'>
                                <div className='col'>3</div>
                                <div className='col'>Toyota Corolla</div>
                                <div className='col'>0</div>
                            </div>
                            <div
                                className='row mt-2'
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
                                    <FontAwesomeIcon icon={faTrash} className='fa' />
                                    Remove
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
                                    <FontAwesomeIcon icon={faPen} className='fa' />
                                    Edit
                                </Button>
                            </div>
                        </Paper>
                    </div>

                    <div className='col-5'>
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
                            Add Vehicle
                        </Button>
                        <div className='form mt-4'>
                            <TextField
                                id='standard-full-width'
                                label='Make'
                                name='make'
                                autoComplete='off'
                                required
                                helperText='Please Enter Vehicle Model'
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <FontAwesomeIcon icon={faCar} className='fa' />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='form' style={{ marginTop: '3%' }}>
                            <TextField
                                id='standard-full-width'
                                label='Name'
                                name='name'
                                autoComplete='off'
                                required
                                helperText='Please Enter Vehicle Name'
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <FontAwesomeIcon icon={faCar} className='fa' />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='form' style={{ marginTop: '3%' }}>
                            <TextField
                                id='standard-full-width'
                                label='Year'
                                name='year'
                                autoComplete='off'
                                required
                                helperText='Please Enter Mgf Year'
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
                        <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
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
                                <b>Submit</b>
                            </Button>
                        </Link>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
