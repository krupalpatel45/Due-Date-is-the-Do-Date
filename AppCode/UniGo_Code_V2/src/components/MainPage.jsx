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

export default function MainPage() {
    const classes = useStyles()
    return (
        <div className={classes.root} style={{ marginTop: '10%' }}>
            <DriveRide />
        </div>
    )
}
