import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MapSelector from '../MapSelector';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import Geocode from "react-geocode";
import { Navigate } from 'react-router-dom';

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

export default function Ride({ setToken, setActiveTrip, name }) {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [mapType, setMapType] = useState();
    const [modalTitle, setModalTitle] = useState('Title Error');
    const [mapCoords, setMapCoords] = useState({
        src: null,
        dst: null
    });
    const [routeResp, setRouteResp] = useState();
    const [rideRouteResp, setRideRouteResp] = useState({ reload: false });
    const [rideTrip, setRideTrip] = useState();
    const [dateTime, setDateTime] = useState(new Date(new Date().getTime() + (60 * 60 * 1000)));
    const [trips, setTrips] = useState({});
    const [finding, setFinding] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const [srcName, setsrcName] = useState("")
    const [destName, setdestName] = useState("")
    const [driver, setDriver] = useState([]);
    const [calculationData, setCalculationData] = useState({});

    const mapRef = useRef();
    const onMapLoad = (map) => {
        mapRef.current = map;
    };

    const openMapModal = (mapType) => {
        setMapType(mapType);
        setModalTitle(mapType === 'src' ? 'Source point' : 'Destination point');
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

    const rideDirectionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK')
                setRideRouteResp({ rideData: response, reload: false })
            else
                alert('Problem fetching directions')
        } else alert('Problem fetching directions')
    }

    const handleRideSubmit = (event) => {
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
            completed: false,
            dateTime: dateTime,
        }
        return fetch("http://localhost:8080/api" + '/trips/', {
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
                setTrips(responseJson.trips);
                setRideTrip(responseJson.trips ? responseJson.trips[0] : {});
                setFinding(false);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
                // window.location.reload();
            });
    }

    const updateCalculation = (s1, d1, s2, d2, trip) => {
        const service = new window.google.maps.DistanceMatrixService();
        service
            .getDistanceMatrix({
                origins: [s1, s2, d2],
                destinations: [s2, d2, d1],
                travelMode: "DRIVING",
            })
            .then((result) => {
                if (
                    result &&
                    result.rows &&
                    result.rows.length > 0 &&
                    result.rows[0].elements &&
                    result.rows[0].elements.length > 0
                ) {
                    var pickUpDuration = result.rows[0].elements[0].duration.value
                    var destinationDuration = result.rows[0].elements[0].duration.value + result.rows[1].elements[1].duration.value
                    var date = new Date(trip.dateTime)
                    var pickUpDateTime = new Date(date.getTime() + pickUpDuration * 1000);
                    var destinationDateTime = new Date(date.getTime() + destinationDuration * 1000);
                    var pickUpLocation = result.originAddresses[1]
                    var dropOffLocation = result.originAddresses[2]

                    var distance = result.rows[0].elements[0].duration.value + result.rows[1].elements[1].duration.value
                    setCalculationData({ pickUpDateTime, destinationDateTime, pickUpLocation, dropOffLocation, distance })
                }
            })
            .catch((error) => {
                console.log("Error calculating distance:", error);
            });
    }

    const handleRideClick = (trip) => e => {
        setRideTrip(trip);
        setRideRouteResp({ ...rideRouteResp, reload: true });
        updateCalculation(trip.source, trip.destination, mapCoords.src, mapCoords.dst, trip)
        fetch("http://localhost:8080/api" + '/user/details?userId=' + trip.driver, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + Cookies.get('tokken'),  //another working solution
                'Coookie': Cookies.get('tokken')
            },
        }).then((response) => {
            if (response.ok)
                return response.json();
            else if (response.status === 401)
                setToken(null);
            throw new Error(response.statusText);
        }).then((responseJson) => {
            setDriver([responseJson.user]);
        }).catch((error) => {
            console.log(error);
            alert(error);
            // window.location.reload();
        });
    }

    const handleRideRequest = (driver) => (e) => {
        console.log(`handleRequestRide`, driver)
        fetch("http://localhost:8080/api" + '/trip/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + Cookies.get('tokken'),  //another working solution
                'Coookie': Cookies.get('tokken')
            },
            body: JSON.stringify({
                driver: driver._id, trip: rideTrip._id,
                src: mapCoords.src, dst: mapCoords.dst, pickUpTime: calculationData.pickUpDateTime,
                riderName: name
            })
        }).then((response) => {
            if (response.ok)
                return response.json();
            else if (response.status === 401)
                setToken(null);
            throw new Error(response.statusText);
        }).then((responseJson) => {
            alert("You request has been submitted successfully");
            setRedirect(true);
        }).catch((error) => {
            console.log(error);
            alert(error);
            // window.location.reload();
        });
    }

    const getWaypoints = (trip) => {
        let waypoints = []
        if ((mapCoords.src.lat != trip.source.lat || mapCoords.src.lon != trip.source.lon) &&
            (mapCoords.src.lat != trip.destination.lat || mapCoords.src.lon != trip.destination.lon)) {
            waypoints.push({ location: mapCoords.src, stopover: true })
        }
        if ((mapCoords.dst.lat != trip.source.lat || mapCoords.dst.lon != trip.source.lon) &&
            (mapCoords.dst.lat != trip.destination.lat || mapCoords.dst.lon != trip.destination.lon)) {
            waypoints.push({ location: mapCoords.dst, stopover: true })
        }
        return waypoints;
    }

    return (
        <>
            {redirect ? <Navigate to="/ride-request" /> : <></>}
            {finding ? <>
                {/* <div style={{ width: '100%', height: '100%', textAlign: 'center' }}> */}
                <Container fluid="lg">
                    <Row style={{ marginTop: '3rem' }}>
                        <Col md>
                            <Row style={{ marginTop: '1rem', fontSize: "36px" }} class="col-xs-1" align="center">Find a Ride</Row>
                            <Row>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="src">
                                        <Col xs="9">
                                            <Form.Control readOnly defaultValue="Source not selected" value={mapCoords['src'] ? srcName : null} />
                                        </Col>
                                        <Col xs="3">
                                            <Button variant="info" onClick={() => openMapModal('src')} style={{ width: '100%' }} data-test="source-button">
                                                Source
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
                                    <Row className='justify-content-center'>
                                        <Col className='col-auto'>
                                            <Button variant="info" type="submit" data-test="ride-submit-button" style={{ marginTop: '3rem' }} onClick={handleRideSubmit}>
                                                Find rides!
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
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
                : trips && trips !== "null" && trips !== "undefined" ?
                    <>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={center}
                            options={options}
                            onLoad={onMapLoad}>
                            {
                                (rideRouteResp == null || rideRouteResp.reload) && (
                                    <DirectionsService
                                        // required
                                        options={{
                                            destination: rideTrip.destination,
                                            origin: rideTrip.source,
                                            travelMode: 'DRIVING',
                                            waypoints: getWaypoints(rideTrip),
                                            optimizeWaypoints: true,
                                        }}
                                        callback={rideDirectionsCallback}
                                    />
                                )
                            }
                            {
                                (rideRouteResp !== null && !rideRouteResp.reload) && (
                                    <DirectionsRenderer
                                        // required
                                        options={{
                                            directions: rideRouteResp.rideData
                                        }}
                                    />
                                )
                            }
                        </GoogleMap>

                        <Container fluid="lg">
                            <Row style={{ marginTop: '3rem' }}>
                                <Col md>
                                    <Row className='p-2'>
                                        Select an option for car pooling
                                    </Row>
                                    {trips.map(trip =>
                                        <Row fluid className='p-2' key={trip._id}>
                                            <Button variant='outline-info' onClick={handleRideClick(trip)}>Car Pool with {trip.driverDetails.name + " " + trip.driverDetails.lastname}</Button>
                                        </Row>
                                    )}
                                </Col>
                                <Col md>
                                    {driver.map(r => {
                                        return <Container fluid="lg">
                                            <Row>
                                                {
                                                    typeof (calculationData) != "undefined" && calculationData != null && calculationData != {} &&
                                                    (<>
                                                        <div><b>Pickup Location:</b> {calculationData.pickUpLocation || ""}</div>
                                                        <div><b>Estimated Pickup Time:</b> {calculationData.pickUpDateTime?.toString() || ""}</div>
                                                        <div><b>Drop off Location:</b> {calculationData.dropOffLocation || ""}</div>
                                                        <div><b>Estimated Drop off Time:</b> {calculationData.destinationDateTime?.toString() || ""}</div>
                                                        <div><b>Your Travelling Distance:</b> {(calculationData.distance / 1609) + " miles" || ""}</div>
                                                    </>)
                                                }
                                                <Button style={{ marginTop: '1rem' }} variant='outline-info' onClick={handleRideRequest(r)}>Request Ride</Button>
                                            </Row>
                                        </Container>
                                    })}
                                </Col>
                            </Row>
                        </Container>
                    </>
                    :
                    <div>No rides available for now.</div>
            }
        </>
    );
}
