import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import MapSelector from '../MapSelector';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import DatePicker from "react-datepicker";
import './Drive.css';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import Geocode from "react-geocode";
import { Navigate } from 'react-router-dom';

Geocode.setApiKey("AIzaSyCCZcb_AEAcCRk0uxe-GjAtUU_ewjpDXIM");

const mapContainerStyle = {
    height: "45vh",
    width: "100%",
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 50.44522126067261,
    lng: -104.61894259252107,
};

export default function Drive({ setToken, setActiveTrip }) {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Title Error');
    const [mapType, setMapType] = useState();
    const [mapCoords, setMapCoords] = useState({
        src: null,
        dst: null
    });
    const [routeResp, setRouteResp] = useState();
    const [dateTime, setDateTime] = useState(new Date(new Date().getTime() + (60 * 60 * 1000)));
    const [riders, setRiders] = useState();

    const [srcName, setsrcName] = useState("")
    const [destName, setdestName] = useState("")
    const [redirect, setRedirect] = useState(false);

    const mapRef = useRef();
    const onMapLoad = (map) => {
        mapRef.current = map;
    };

    const openMapModal = (mapType) => {
        setMapType(mapType);
        setModalTitle(mapType === 'src' ? 'Start' : 'Destination');
        setShowModal(true);
    }

    const getLocFromCoords = (coords, type) => {
        let lat = coords['lat']
        let long = coords['lng']

        Geocode.fromLatLng(lat, long).then(
            (res) => {
                const location = res.results[0].formatted_address;
                if (type === 'src') {
                    setsrcName(location)
                }
                else {
                    setdestName(location)
                }
            },
            (err) => {
                console.error(err);
                if (type === 'src') {
                    setsrcName(lat + ',' + long)
                }
                else {
                    setdestName(lat + ',' + long)
                }
            }
        );
    }

    const handleCallback = (closeButtonClicked, mapType, mapData) => {
        setShowModal(false);
        if (closeButtonClicked) return;

        setMapCoords({
            ...mapCoords,
            [mapType]: mapData
        })
        getLocFromCoords(mapData, mapType);
    }

    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK')
                setRouteResp(response)
            else
                alert('Problem fetching directions')
        } else alert('Problem fetching directions')
    }

    const handleDriveSubmit = (event) => {
        event.preventDefault();
        const data = {
            src: {
                lat: mapCoords.src.lat,
                lng: mapCoords.src.lng
            },
            dst: {
                lat: mapCoords.dst.lat,
                lng: mapCoords.dst.lng
            },
            route: routeResp.routes[0].overview_path,
            dateTime: dateTime,
            max_riders: riders
        }
        console.log(data);
        return fetch("http://18.224.165.108:8080/api" + '/trip/drive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + Cookies.get('tokken'),  //another working solution
                'Coookie': Cookies.get('tokken')
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok)
                    return response.json();
                else if (response.status === 401)
                    setToken(null);
                throw new Error(response.statusText);
            })
            .then((responseJson) => {
                alert("Your drive is scheduled");
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
                window.location.reload();
            });
    }

    useEffect(() => {
        setRouteResp(null);
    }, [mapCoords]);

    return (
        <>
            {redirect ? <Navigate to="/ride-request" /> : <></>}
            {/* <div style={{ width: '100%', height: '100%', textAlign: 'center' }}> */}
            <Container fluid="lg">
                <Row style={{ marginTop: '3rem' }}>
                    <Col md>
                        <Row style={{ marginTop: '1rem', fontSize: "36px" }} class="col-xs-1" align="center">Schedule Your Ride</Row>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="src">
                                <Col xs="9">
                                    <Form.Control readOnly defaultValue="Starting position not selected" value={mapCoords['src'] ? srcName : null} />
                                </Col>
                                <Col xs="3">
                                    <Button variant="info" onClick={() => openMapModal('src')} style={{ width: '100%' }} data-test="source-button">
                                        Start
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="dst">
                                <Col xs="9">
                                    <Form.Control readOnly defaultValue="Destination not selected" value={mapCoords['dst'] ? destName : null} />
                                </Col>
                                <Col xs="3">
                                    <Button variant="info" onClick={() => openMapModal('dst')} style={{ width: '100%' }} data-test="destination-button">
                                        Destination
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Row style={{ marginTop: '1rem' }}>
                                <Col xs="6" sm="3" md="4">
                                    <label>Date-Time of trip: </label>
                                </Col>
                                <Col xs="6">
                                    <DatePicker
                                        showTimeSelect
                                        selected={dateTime}
                                        minDate={new Date()}
                                        closeOnScroll={true}
                                        onChange={(date) => setDateTime(date)}
                                        dateFormat="MMMM d @ h:mm aa" />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '1rem' }}>
                                <Col sm="7" md="12" xl="8">
                                    <FloatingLabel controlId="ridingWith" label="Select number of people can ride with">
                                        <Form.Select onChange={e => { setRiders(e.target.value) }}>
                                            <option>----- Select -----</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                            <option value="5">Five</option>
                                            <option value="6">Six</option>
                                            <option value="7">Seven</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col className='col-auto'>
                                    <Button variant="info" type="submit" data-test="drive-submit-button" style={{ marginTop: '3rem' }} onClick={handleDriveSubmit}>
                                        Schedule drive!
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md style={{ marginTop: '2rem' }}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={center}
                            options={options}
                            onLoad={onMapLoad}
                        >
                            {
                                (routeResp == null &&
                                    mapCoords['src'] != null && mapCoords['dst'] != null) && (
                                    <DirectionsService
                                        // required
                                        options={{
                                            destination: mapCoords['dst'],
                                            origin: mapCoords['src'],
                                            travelMode: 'DRIVING',
                                            drivingOptions: {
                                                departureTime: dateTime
                                            }
                                        }}
                                        // required
                                        callback={directionsCallback}
                                    />
                                )
                            }

                            {
                                routeResp !== null && (
                                    <DirectionsRenderer
                                        // required
                                        options={{
                                            directions: routeResp
                                        }}
                                    />
                                )
                            }
                        </GoogleMap>
                    </Col>
                </Row>
            </Container>
            <MapSelector
                showModal={showModal}
                mapType={mapType}
                modalTitle={modalTitle}
                mapCoords={mapCoords}
                handleCallback={handleCallback}
            />
        </>
    );
}