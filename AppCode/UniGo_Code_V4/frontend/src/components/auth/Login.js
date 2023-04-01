import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import image from '../../Background.png';

export default function Login({ setToken, setActiveTrip }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function loginUser(credentials) {
        return fetch("http://18.221.134.12:8080/api" + '/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                alert(error);
            });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const data = {
            email,
            password
        }

        if(data.email==='admin@uregina.ca' && data.password==='Admin@123'){
            localStorage.setItem('id',"6419ed1c4fe73e2f5e5a6a22");
            localStorage.setItem('isadmin',1);
            navigate('/admin');
        }else{
            localStorage.setItem('isadmin',0)
        }
        const sessionUserDetails = await loginUser(data);
        localStorage.setItem('id', sessionUserDetails.user._id);
        if (sessionUserDetails) {
            if (sessionUserDetails.user.active_trip)
                setActiveTrip(sessionUserDetails.user.active_trip);
            if (sessionUserDetails.token)
                setToken({ token: sessionUserDetails.token, name: sessionUserDetails.user.name });
            window.location.reload();
        }
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    return (
        <Container style={{backgroundImage:`url(${image})`,backgroundRepeat:"round",margin:"3%",padding:"3%",backgroundSize:"cover"}}>
            <Row>
                <Col xs={8}>
                    <Container className="pt-5" style={{fontSize:"1.6em",fontWeight:"bold"}}>
                        
                        <Col xs={7}>
                    {/* "Join the sustainable way of commuting with our carpooling community. Save money, reduce emissions, and make new connections on the road." */}
                    </Col>
                    
                    </Container>
                </Col>
                <Col>
                    {/* <div className="login-container"> */}
                        {/* <div className="login-content"> */}
                        <Container className="pt-5" style={{backgroundColor:"rgba(100,5,40,0)"}}>
                            <Form onSubmit={handleSubmit} data-test="login-form">
                                <h3 className="heading-text">Login</h3>
                                <Form.Group size="lg" controlId="email" className="form-group">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        data-test="email-form-control"
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group size="lg" controlId="password" className="form-group">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        data-test="password-form-control"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button data-test="login-button" size="lg" type="submit" disabled={!validateForm()} className="login-button">
                                    Login
                                </Button>
                            </Form>
                            <Link to='/signup' className="signup-link">SignUp</Link>
                            </Container>
                        {/* </div>
                    </div> */}
                </Col>
            </Row>
        </Container>
        // <div className="login-container">
        //     <div className="login-content">
        //         <Form onSubmit={handleSubmit} data-test="login-form">
        //             <h3 className="heading-text">Login</h3>
        //             <Form.Group size="lg" controlId="email" className="form-group">
        //                 <Form.Label>Email</Form.Label>
        //                 <Form.Control
        //                     data-test="email-form-control"
        //                     autoFocus
        //                     type="email"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                 />
        //             </Form.Group>
        //             <Form.Group size="lg" controlId="password" className="form-group">
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control
        //                     data-test="password-form-control"
        //                     type="password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                 />
        //             </Form.Group>
        //             <Button data-test="login-button" size="lg" type="submit" disabled={!validateForm()} className="login-button">
        //                 Login
        //             </Button>
        //         </Form>
        //         <Link to='/signup' className="signup-link">SignUp</Link>
        //     </div>
        // </div>
    );
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   };
