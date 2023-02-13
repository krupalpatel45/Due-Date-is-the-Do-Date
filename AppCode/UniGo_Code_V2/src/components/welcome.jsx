import React, { Component } from 'react'
import {
    faInfinity,
    faUser,
    faUnlock,
    faSignInAlt,
    faShoppingCart,
    faCheckCircle,
    faRibbon,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom'
import { AccountCircle } from '@material-ui/icons'

// use of MATERIAL UI
import {
    Avatar,
    Button,
    Paper,
    TextField,
    Grid,
    makeStyles,
    InputAdornment,
    InputLabel,
    Snackbar,
    Fab,
    Divider,
    CircularProgress,
} from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import MuiAlert from '@material-ui/lab/Alert'
import Cookies from 'universal-cookie'

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

class Welcome extends Component {
    state = {
        username: this.props.match.params.id,
        cand: '',
        timer: setInterval(() => this.reduceTime(), 1000),
        buttonText: { sec: 10, text: '00:10' },
        snackOpen: true,
    }
    async componentDidMount() {
        const cookies = new Cookies()
        let user = cookies.get('user')
        if (user === undefined) {
            this.props.history.push({
                pathname: '/login',
                search: '',
            })
        }
        let resp = await axios.get('https://bharti-quiz.firebaseio.com/candidates.json')
        let cand = null
        let x = Object.keys(resp.data)
        for (let i = 0; i < x.length; i++) {
            if (x[i] === this.state.username) {
                cand = resp.data[x[i]]
                break
            }
        }
        console.log(cand)
        this.setState({ cand: cand })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        this.setState({ snackOpen: false })
    }
    reduceTime = () => {
        let localSec = this.state.buttonText
        if (localSec.sec === 0) {
            localSec.text = 'START TEST'
            localSec.sec = 0
            clearInterval(this.state.timer)
        } else {
            localSec.sec -= 1
            localSec.text = '00:' + localSec.sec
        }
        this.setState({ buttonText: localSec })
    }
    render() {
        return (
            <div>
                <center>
                    <div className='col-4' style={{ marginTop: '2%' }}>
                        <h2>
                            <FontAwesomeIcon icon={faRibbon} className='fa fa-2x' /> <b>WELCOME</b>
                        </h2>
                        <Paper elevation={5} style={{ borderRadius: '10px', padding: '10px' }}>
                            <Grid container spacing={0}>
                                <Grid item xs={2}>
                                    <FontAwesomeIcon icon={faUser} className='fa fa-3x' />
                                </Grid>
                                <Grid item xs={10}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={5}>
                                            Name :{' '}
                                            {this.state.cand === '' ? (
                                                <FontAwesomeIcon
                                                    icon={faSpinner}
                                                    className='fa-spin fa-fw'
                                                />
                                            ) : (
                                                <b>{this.state.cand.name}</b>
                                            )}
                                        </Grid>

                                        <Grid item xs={5}>
                                            Class: <b>{this.state.cand.class}</b>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0}>
                                        <Grid item xs={5}>
                                            Subject : <b>{this.state.cand.subject}</b>
                                        </Grid>

                                        <Grid item xs={5}>
                                            Topic : <b>{this.state.cand.topic}</b>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider />
                            <br></br>
                            <center>
                                <h4>
                                    <b>Instructions / निर्देश </b>
                                </h4>
                            </center>
                            <Grid container spacing={0}>
                                <Grid item xs={1}>
                                    <Avatar
                                        style={{
                                            backgroundColor: 'black',
                                            height: '20px',
                                            width: '20px',
                                        }}
                                    >
                                        <b>1</b>
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11} style={{ textAlign: 'left' }}>
                                    <tt>Please read the instructions carefully.</tt>
                                    <br></br>

                                    <b>कृपया निर्देशों को ध्यान से पढ़ें।</b>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid item xs={1}>
                                    <Avatar
                                        style={{
                                            backgroundColor: 'black',
                                            height: '20px',
                                            width: '20px',
                                        }}
                                    >
                                        <b>2</b>
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11} style={{ textAlign: 'left' }}>
                                    <tt>Please attempt all the questions</tt>
                                    <br></br>
                                    <b>कृपया सभी प्रश्नों का प्रयास करें</b>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid item xs={1}>
                                    <Avatar
                                        style={{
                                            backgroundColor: 'black',
                                            height: '20px',
                                            width: '20px',
                                        }}
                                    >
                                        <b>3</b>
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11} style={{ textAlign: 'left' }}>
                                    <tt>
                                        Correct Answer will fetch you <b>+1</b> marks.
                                    </tt>
                                    <br></br>
                                    <b>सही उत्तर आपको +1 अंक प्राप्त होगा।</b>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid item xs={1}>
                                    <Avatar
                                        style={{
                                            backgroundColor: 'black',
                                            height: '20px',
                                            width: '20px',
                                        }}
                                    >
                                        <b>4</b>
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11} style={{ textAlign: 'left' }}>
                                    <tt>
                                        However, <b>+0</b> will be awarded for wrong answer or
                                        unattempted questions.
                                    </tt>
                                    <br></br>
                                    <b>
                                        हालांकि, गलत जवाब या बिना जवाब दिए सवालों के लिए +0 को
                                        सम्मानित किया जाएगा।
                                    </b>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>

                    {this.state.buttonText.sec === 0 ? (
                        <Link to={'/startTest/' + this.state.username} style={{ color: 'white' }}>
                            <Fab
                                variant='extended'
                                color='primary'
                                style={{ marginTop: '10px', padding: '20px' }}
                                size='large'
                            >
                                <div>
                                    <ExitToApp />
                                    {'  '}
                                    <b>START TEST</b>
                                </div>
                            </Fab>
                        </Link>
                    ) : (
                        <Fab
                            variant='extended'
                            color='primary'
                            style={{ marginTop: '10px', padding: '20px' }}
                            size='large'
                            disabled
                        >
                            <div>
                                <b>
                                    <h3>
                                        <tt>{this.state.buttonText.text}</tt>
                                    </h3>
                                </b>
                            </div>
                        </Fab>
                    )}
                </center>
                <Snackbar
                    open={this.state.snackOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <Alert onClose={this.handleClose} severity='success'>
                        <center>
                            Welcome,<br></br>
                            <b>{this.state.cand.name}</b>
                        </center>
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default Welcome
