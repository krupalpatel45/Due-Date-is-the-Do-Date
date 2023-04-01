import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import Geocode from "react-geocode";
import * as MdIcons from 'react-icons/md';
import { Link } from 'react-router-dom';

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



export default function RideRequest({ setToken, setActiveTrip }) {

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
    const [driver, setDriver] = useState([]);
    const [ride, setRide] = useState([]);
    const [finding, setFinding] = useState(true);

    const [srcName, setsrcName] = useState("")
    const [destName, setdestName] = useState("")

    const [rideRequests, setRideRequests] = useState({ loading: true });

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
            console.log(`directionsCallback`, response)
            if (response.status === 'OK')
                setRouteResp(response)
            else
                alert('Problem fetching directions')
        } else alert('Problem fetching directions')
    }

    const rideDirectionsCallback = (response) => {
        console.log(`rideDirectionsCallback`, response)
        if (response !== null) {
            if (response.status === 'OK')
                setRideRouteResp({ rideData: response, reload: false })
            else
                alert('Problem fetching directions')
        } else alert('Problem fetching directions')
    }

    const handleRideClick = (ride) => e => {
        setRide(ride)
        fetch("http://18.221.134.12:8080/api" + '/user/details?userId=' + ride.rider, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + Cookies.get('tokken'),  //another working solution
                'Coookie': Cookies.get('tokken')
            },
        })
            .then((response) => {
                if (response.ok)
                    return response.json();
                else if (response.status === 401)
                    setToken(null);
                throw new Error(response.statusText);
            })
            .then((responseJson) => {
                console.log(`responseJson`, responseJson.user);
                setDriver([responseJson.user]);
            })
            .catch((error) => {
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
        console.log(`waypoints`, waypoints);
        return waypoints;
    }


    useEffect(() => {
        fetch("http://18.221.134.12:8080/api/ride/requests/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Coookie': Cookies.get('tokken')
            },
            body: JSON.stringify({
                state: "pending"
            }),
        }).then((response) => {
            console.log(`response`, response)
            if (response.ok) {
                return response.json();
            }
        }).then((responseJson) => {
            console.log(`responseJson`, responseJson)
            setRideRequests({ rides: [...responseJson.rideRequests], loading: false });
        }).catch((error) => {
            console.log(`error`, error);
        });
    }, []);


    return <>
        {
            rideRequests == null || rideRequests.loading ?
                <div>Loading...</div>
                :
                rideRequests != null && rideRequests.rides.length > 0
                    ? <>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={center}
                            options={options}
                            onLoad={onMapLoad}>
                            {
                                (ride != null || ride._id != null) && (
                                    <DirectionsService
                                        // required
                                        options={{
                                            destination: ride.destination,
                                            origin: ride.source,
                                            travelMode: 'DRIVING',
                                            waypoints: ride.waypoints,
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
                                <Col>
                                    <div>Pending Ride Requests</div>
                                    {rideRequests.rides.map(ride =>
                                        <Row className='p-2' key={ride._id}>
                                            <Button variant='outline-info' onClick={handleRideClick(ride)}>Rider id {ride.rider}</Button>
                                        </Row>
                                    )}
                                </Col>
                                <Col md>
                                    {driver.map(r => {
                                        return (<Container fluid="lg">
                                            <Row style={{ marginTop: '3rem' }}>
                                                <div>Driver Name: {r.name}</div>
                                            </Row>
                                        </Container>)
                                    })}
                                </Col>
                            </Row>
                        </Container>
                    </>
                    : <>
                        <div class="text-center" style={{ fontSize: '24px' }}>No pending requests.</div>
                        <div class="text-center" style={{ margin: '1rem 0' }}>
                            <Link to='/ride'>
                                <Button variant='light-info' className={'main-button'} data-test="drive-button">
                                    <MdIcons.MdPeopleOutline style={{ color: 'black', marginRight: '0.3rem' }} data-test='ride-icon' /> Find a Ride
                                </Button>
                            </Link>
                        </div>
                    </>
        }
    </>
}