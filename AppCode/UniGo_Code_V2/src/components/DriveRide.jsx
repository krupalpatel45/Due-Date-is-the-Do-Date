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

const useStyles = makeStyles({
    root: {
        borderRadius: 50,
        padding: '10px 20px',
        fontWeight: 'bold',
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
    },
})

export default function PillButton() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Button
                variant='contained'
                color='primary'
                style={{
                    borderTopLeftRadius: '70px',
                    borderBottomLeftRadius: '70px',
                    fontSize: '30px',
                    width: '50%',
                    height: '150px',
                }}
            >
                <Link to='/drive' style={{ color: 'white', textDecoration: 'none' }}>
                    Drive
                </Link>
            </Button>

            <Button
                variant='contained'
                color='secondary'
                style={{
                    borderTopRightRadius: '70px',
                    borderBottomRightRadius: '70px',
                    fontSize: '30px',
                    width: '50%',
                    height: '150px',
                }}
            >
                <Link to='/ride' style={{ color: 'white', textDecoration: 'none' }}>
                    Ride
                </Link>
            </Button>
        </div>
    )
}
