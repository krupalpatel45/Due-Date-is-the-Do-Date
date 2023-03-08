import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import MapSelector from '../MapSelector';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCCZcb_AEAcCRk0uxe-GjAtUU_ewjpDXIM");

const mapContainerStyle = {
    height: "60vh",
    width: "100%",
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 43.473078230478336,
    lng: -80.54225947407059,
};

export default function UserDetails({ userDetails, type }) {
    if (userDetails != null) {
        return <>
            <Container fluid="lg">
                <Row style={{ marginTop: '3rem' }}>
                    {type} Name: {userDetails.name + " " + userDetails.lastname}
                </Row>
            </Container>
        </>
    }
}