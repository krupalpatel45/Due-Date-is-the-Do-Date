import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#2E3B55',
        color: '#fff',
    },
})

export default function Footer() {
    const classes = useStyles()

    return (
        <footer className={classes.root}>
            <Button color='inherit' variant='outlined' style={{ marginRight: '1%' }}>
                How to Ride?
            </Button>
            <Button color='inherit' variant='outlined' style={{ marginRight: '1%' }}>
                How to Drive?
            </Button>
            <Button color='inherit' variant='outlined'>
                About Us
            </Button>
        </footer>
    )
}
