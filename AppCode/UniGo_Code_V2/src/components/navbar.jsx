import React, { Component } from 'react'

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
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    Avatar,
    Menu,
    MenuItem,
    withStyles,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import Cookies from 'universal-cookie'
import {
    faInfinity,
    faUser,
    faUnlock,
    faSignInAlt,
    faShoppingCart,
    faCheckCircle,
    faSignOutAlt,
    faPlus,
    faUniversity,
    faUserPlus,
    faUsers,
    faSun,
    faMoon,
    faTimes,
    faClock,
    faCar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { connect } from 'react-redux'
import * as ACTIONS from './Reducer/actions'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles(theme => ({
    root: {},
}))(MenuItem)

class NavBar extends Component {
    state = {
        anchorEl: null,
        user: '',
    }
    componentDidMount() {
        this.setState({ anchorEl: null })
    }
    handleClick = e => {
        this.setState({ anchorEl: e.currentTarget })
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    handleLogout = () => {
        const cookies = new Cookies()
        cookies.remove('user', { path: '/' })
        cookies.remove('username', { path: '/' })
        window.location.reload()
    }
    actionChangeTheme = () => {
        let newDark = this.state.dummyDark
        if (newDark === false) newDark = true
        else newDark = false
        this.props.THEME()
    }
    getMode = type => {
        if (this.props.curState.dark === true && type === 'dark') return '#D35400'
        else if (this.props.curState.dark === false && type === 'light') return '#D35400'
        return ''
    }
    getMenu = () => {
        const cookies = new Cookies()
        let username = cookies.get('username')

        if (username !== undefined && username.split('@')[0] === 'admin')
            return (
                <div>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FontAwesomeIcon className='fa fa-2x' icon={faPlus} />
                        </ListItemIcon>
                        <Link to='/addQuestion' style={{ color: 'black' }}>
                            <ListItemText primary='Add Question' />
                        </Link>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FontAwesomeIcon className='fa fa-2x' icon={faUniversity} />
                        </ListItemIcon>
                        <Link to='/questionBank' style={{ color: 'black' }}>
                            <ListItemText primary='Question Bank' />
                        </Link>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FontAwesomeIcon className='fa fa-2x' icon={faUserPlus} />
                        </ListItemIcon>
                        <Link to='/registerStudent' style={{ color: 'black' }}>
                            <ListItemText primary='Register Candidate' />
                        </Link>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FontAwesomeIcon className='fa fa-2x' icon={faUsers} />
                        </ListItemIcon>
                        <Link to='/candidateList' style={{ color: 'black' }}>
                            <ListItemText primary='List Of Candidates' />
                        </Link>
                    </StyledMenuItem>
                    <Divider />
                    <StyledMenuItem onClick={this.handleLogout}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                className='fa fa-2x'
                                icon={faSignOutAlt}
                                style={{ color: 'red' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </StyledMenuItem>
                </div>
            )
        else
            return (
                <div>
                    {' '}
                    <StyledMenuItem onClick={this.handleLogout}>
                        <ListItemIcon>
                            <FontAwesomeIcon
                                className='fa fa-2x'
                                icon={faSignOutAlt}
                                style={{ color: 'red' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </StyledMenuItem>
                </div>
            )
    }
    render() {
        const cookies = new Cookies()
        let username = cookies.get('username')
        let menuItem = this.getMenu()
        return (
            <div>
                <AppBar
                    position='fixed'
                    style={{
                        backgroundColor: this.props.curState.theme.color,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                    elevation={12}
                >
                    <Toolbar>
                        <Box display='flex' flexGrow={1}>
                            <div className='row'>
                                <div className='col-3' style={{ float: 'right' }}>
                                    <IconButton edge='start' color='inherit' aria-label='menu'>
                                        <FontAwesomeIcon
                                            className='fa fa-2x'
                                            icon={faInfinity}
                                            style={{ color: 'white' }}
                                        />{' '}
                                    </IconButton>
                                </div>
                                <div className='col-2' style={{ marginTop: '6%', float: 'left' }}>
                                    <Link to='/' style={{ color: 'white' }}>
                                        <Typography
                                            variant='h6'
                                            className='ml-3 mt-1'
                                            style={{ fontSize: '25px' }}
                                        >
                                            <b>
                                                <tt>UniGo</tt>
                                            </b>
                                        </Typography>
                                    </Link>
                                </div>
                            </div>
                        </Box>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={this.actionChangeTheme}
                            aria-haspopup='true'
                            aria-controls='menu-appbar'
                            style={{ backgroundColor: this.getMode('light'), height: '30%' }}
                        >
                            <FontAwesomeIcon
                                className='fa fa-2x'
                                icon={faSun}
                                style={{ color: 'white' }}
                            />{' '}
                        </IconButton>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={this.actionChangeTheme}
                            aria-haspopup='true'
                            aria-controls='menu-appbar'
                            style={{ backgroundColor: this.getMode('dark'), height: '30%' }}
                        >
                            <FontAwesomeIcon
                                className='fa fa-2x'
                                icon={faMoon}
                                style={{ color: 'white' }}
                            />{' '}
                        </IconButton>
                        {username !== undefined ? (
                            <div>
                                <IconButton
                                    edge='start'
                                    color='inherit'
                                    onClick={this.handleClick}
                                    aria-haspopup='true'
                                    aria-controls='menu-appbar'
                                >
                                    <Avatar>
                                        <AccountCircle />
                                    </Avatar>
                                    <tt>{username}</tt>
                                </IconButton>
                                <StyledMenu
                                    id='simple-menu'
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <div>
                                        <StyledMenuItem>
                                            <ListItemIcon>
                                                <FontAwesomeIcon
                                                    className='fa fa-2x'
                                                    icon={faUser}
                                                />
                                            </ListItemIcon>
                                            <Link to='/userProfile' style={{ color: 'black' }}>
                                                <ListItemText primary='User Profile' />
                                            </Link>
                                        </StyledMenuItem>
                                        <StyledMenuItem>
                                            <ListItemIcon>
                                                <FontAwesomeIcon
                                                    className='fa fa-2x'
                                                    icon={faClock}
                                                />
                                            </ListItemIcon>
                                            <Link to='/driveHistory' style={{ color: 'black' }}>
                                                <ListItemText primary='Drive History' />
                                            </Link>
                                        </StyledMenuItem>
                                        <StyledMenuItem>
                                            <ListItemIcon>
                                                <FontAwesomeIcon
                                                    className='fa fa-2x'
                                                    icon={faCar}
                                                />
                                            </ListItemIcon>
                                            <Link to='/vehicles' style={{ color: 'black' }}>
                                                <ListItemText primary='My Vehicles' />
                                            </Link>
                                        </StyledMenuItem>

                                        <Divider />
                                        <StyledMenuItem onClick={this.handleLogout}>
                                            <ListItemIcon>
                                                <FontAwesomeIcon
                                                    className='fa fa-2x'
                                                    icon={faSignOutAlt}
                                                    style={{ color: 'red' }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary='Logout' />
                                        </StyledMenuItem>
                                    </div>
                                </StyledMenu>
                            </div>
                        ) : (
                            ''
                        )}
                    </Toolbar>
                </AppBar>
                <br></br>
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    curState: state,
})
export default connect(mapStateToProps, { THEME: ACTIONS.changeTheme })(NavBar)
