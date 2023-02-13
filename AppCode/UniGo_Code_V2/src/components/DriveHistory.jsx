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

export default function DriveHistory() {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ marginTop: '5%' }}>
            <h2>Drive History</h2>
            <Paper
                elevation={5}
                style={{
                    borderRadius: '10px',
                    height: '600px',
                    width: '60%',
                    padding: '2%',
                    display: 'flex',
                    flexDirection: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
            >
                <FontAwesomeIcon icon={faCar} className='fa' style={{ fontSize: '100px' }} />
                <Paper
                    elevation={5}
                    className=''
                    style={{
                        borderRadius: '10px',
                        width: '75%',
                        padding: '2%',
                    }}
                >
                    <div
                        className='row'
                        style={{
                            backgroundColor: '#2E3B55',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '20px',
                        }}
                    >
                        <div className='col-1'></div>
                        <div className='col-2'>PickUp</div>
                        <div className='col-2'>Drop</div>
                        <div className='col-2'>Vehicle</div>
                        <div className='col-2'>Duration</div>
                        <div className='col-2'>Cost</div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-1'>1</div>
                        <div className='col-2'>Marriott</div>
                        <div className='col-2'>Fairmont</div>
                        <div className='col-2'>Honda Civic</div>
                        <div className='col-2'>35 min</div>
                        <div className='col-2'>200$</div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-1'>2</div>
                        <div className='col-2'>Toronto Airport</div>
                        <div className='col-2'>Stanley Park</div>
                        <div className='col-2'>Toyota Camry</div>
                        <div className='col-2'>35 min</div>
                        <div className='col-2'>250$</div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-1'>3</div>
                        <div className='col-2'>Rogers Centre</div>
                        <div className='col-2'>Stanley Park</div>
                        <div className='col-2'> Honda Civic </div>
                        <div className='col-2'>35 min</div>
                        <div className='col-2'>300$</div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-1'>4</div>
                        <div className='col-2'>Pacific Central </div>
                        <div className='col-2'>Stanley Park</div>
                        <div className='col-2'> Toyota Camry </div>
                        <div className='col-2'>35 min</div>
                        <div className='col-2'>300$</div>
                    </div>
                </Paper>
            </Paper>
        </div>
    )
}
