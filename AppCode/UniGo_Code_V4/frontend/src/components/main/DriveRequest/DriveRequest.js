import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import Geocode from "react-geocode";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

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

const baseKmRate = 1;
const baseMinRate = 0.1;
const addKmRate = 2;
const addMinRate = 0.2;


export default function DriveRequest({ setToken, setActiveTrip }) {

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
    const [rider, setRider] = useState([]);
    const [ride, setRide] = useState([]);
    const [finding, setFinding] = useState(true);

    const [srcName, setsrcName] = useState("")
    const [destName, setdestName] = useState("")

    const [rideRequests, setRideRequests] = useState({ loading: true });
    const [calculationData, setCalculationData] = useState({});

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
        if (response !== null) {
            if (response.status === 'OK')
                setRideRouteResp({ rideData: response, reload: false })
            else
                alert('Problem fetching directions')
        } else alert('Problem fetching directions')
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
                    var pickUpLocation = result.originAddresses[1]
                    var dropOffLocation = result.originAddresses[2]

                    var oldDuration = result.rows[0].elements[2].duration.value
                    var newDuration = result.rows[0].elements[0].duration.value + result.rows[1].elements[1].duration.value + result.rows[2].elements[2].duration.value
                    var originalDistance = result.rows[0].elements[2].duration.value
                    var newDistance = result.rows[0].elements[0].duration.value + result.rows[1].elements[1].duration.value + result.rows[2].elements[2].duration.value

                    var fare = ((originalDistance * baseKmRate) / 1000) + ((oldDuration * baseMinRate) / 60)
                    var addFare = (((newDistance - originalDistance) * baseKmRate) / 1000) + (((newDuration - oldDuration) * baseMinRate) / 60)
                    if (addFare <= 0) {
                        addFare = 1
                    }
                    var newDurationMin = parseInt(newDuration / 60)
                    var newDurationSec = (newDuration % 60).toFixed(0)
                    setCalculationData({ pickUpLocation, dropOffLocation, pickUpLocation, newDistance, newDuration, fare, addFare, newDurationMin, newDurationSec })
                }
            })
            .catch((error) => {
                console.log("Error calculating distance:", error);
            });
    }

    const handleRideClick = (trip) => e => {
       // console.log(`ride`, trip)
        setRideTrip(trip);
        setRideRouteResp({ ...rideRouteResp, reload: true });
        updateCalculation(trip.source, trip.destination, trip.pickUpPoints[0], trip.pickUpPoints[1], trip)
        fetch("http://18.221.134.12:8080/api" + '/user/details?userId=' + trip.rider, {
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
            setRider([responseJson.user]);
        }).catch((error) => {
            console.log(error);
            alert(error);
            // window.location.reload();
        });
    }

    const handleRideAction = (action) => e => {
        fetch("http://18.221.134.12:8080/api" + '/update/request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + Cookies.get('tokken'),  //another working solution
                'Coookie': Cookies.get('tokken')
            },
            body: JSON.stringify({ action, tripRequest: rideTrip._id })
        }).then((response) => {
            if (response.ok)
                return response.json();
            else if (response.status === 401)
                setToken(null);
            throw new Error(response.statusText);
        }).then((responseJson) => {
            alert(responseJson.msg);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            alert(error);
            // window.location.reload();
        });
    }
    const getWaypoints = (trip) => {
        //console.log(`trip`, trip)
        let waypoints = []
        trip.pickUpPoints.forEach(p => waypoints.push({ location: p, stopover: true }))
        return waypoints;
    }


    useEffect(() => {
        fetch("http://18.221.134.12:8080/api/drive/requests/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Coookie': Cookies.get('tokken')
            },
            body: JSON.stringify({
                state: "pending"
            }),
        }).then((response) => {
           // console.log(`response`, response)
            if (response.ok) {
                return response.json();
            }
        }).then((responseJson) => {
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
                        <Container fluid="lg">
                            <Row style={{ marginTop: '3rem' }}>
                                <Col>
                                    <div>Pending Ride Requests</div>
                                    {rideRequests.rides.map(ride =>
                                        <Row className='p-2' key={ride._id}>
                                            <Button variant='info' onClick={handleRideClick(ride)}>Rider Name {ride.riderName}</Button>
                                        </Row>
                                    )}
                                </Col>
                                <Col>
                                    <Row>
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
                                    </Row>
                                    <Row>
                                        {rider.map(r => {
                                            return <Container fluid="lg">
                                                <Row>
                                                    {
                                                        typeof (calculationData) != "undefined" && calculationData != null && calculationData != {} &&
                                                        (<>
                                                            <div><b>Pickup Location:</b> {calculationData.pickUpLocation || ""}</div>
                                                            <div><b>Drop off Location:</b> {calculationData.dropOffLocation || ""}</div>
                                                            <div><b>Total Ride Distance:</b> {calculationData ? (calculationData.newDistance / 1000).toFixed(3) + " km" || "" : ""}</div>
                                                            <div><b>Total Ride Duration:</b> {calculationData.newDuration ? (calculationData.newDurationMin + " minutes " + calculationData.newDurationSec + " seconds" || "") : ""}</div>
                                                            <div><b>Base Fare:</b> {"$" + calculationData.fare?.toFixed(2) || ""}</div>
                                                            <div><b>Additional Fare:</b> {"$" + calculationData.addFare?.toFixed(2) || ""}</div>
                                                        </>)
                                                    }
                                                    <div>
                                                        <Button style={{ margin: '1rem' }} variant='outline-info' onClick={handleRideAction("accepted")}>Accept Ride</Button>
                                                        <Button style={{ margin: '1rem' }} variant='outline-info' onClick={handleRideAction("rejected")}>Reject Ride</Button>
                                                    </div>
                                                </Row>
                                            </Container>
                                        })}
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </>
                    : <>
                        <div class="text-center" style={{ fontSize: '24px' }}>No pending requests.</div>
                        <div class="text-center" style={{ margin: '1rem 0' }}>
                            <Link to='/drive'>
                                <Button variant='light-info' className={'main-button'} data-test="drive-button">
                                    <AiIcons.AiTwotoneCar style={{ color: 'black', marginTop: '0 0.3rem' }} data-test='drive-icon' /> Schedule a Ride
                                </Button>
                            </Link>
                        </div>
                    </>

        }
    </>
}