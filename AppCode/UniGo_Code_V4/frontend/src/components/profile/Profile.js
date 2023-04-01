import React, { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Profile() {

    const [user,setUser] = useState({});
    const [isVehicle,setIsVehicle]=useState(false);
    const [vmake,setvMake]= useState();
    const [vname,setvName] = useState();
    const [vseat,setvSeat ] = useState();
    const[vmodel,setvModel] = useState();
    const[vyear,setvYear] = useState();
    var id = localStorage.getItem("id");
    var isadmin = localStorage.getItem('isadmin')==1 ? <MDBBtn><Link className='text-reset fw-bold' to='/admin'>User Details</Link></MDBBtn> : <></>


    useEffect(()=>{
        axios.get('http://18.221.134.12:8080/api/user/details?userId='+id).then((res)=>{
            setUser(res.data.user);
            if(res.data.user.VehicleName!=null){
                setIsVehicle(true);
            }
        })
    },[isVehicle]);
   
    function setVehicleDetails(){
        const updateuser ={
            userId:id,
            VehicleName:vname,
            VehicleMake:vmake,
            VehicleModel:vmodel,
            VehicleSeats:vseat,
            VehicleYear:vyear
        }

        axios.post('http://18.221.134.12:8080/api/user/updatedetails',updateuser).then((result)=>{
            if(result.status==200){
                alert('Details updated successfully');
                setIsVehicle(true);
            }
        }).catch((err)=>alert(err));
    }
    

    let vehicleName = isVehicle ? user.VehicleName:<MDBInput id='vehiclename' type='text' value={vname} onChange={(e) => { setvName(e.target.value) }}  />
    let VehicleMake = isVehicle ? user.VehicleMake:<MDBInput id='vehiclemake' type='text' value={vmake} onChange={(e) => { setvMake(e.target.value) }}/>
    let VehicleModel = isVehicle ? user.VehicleModel:<MDBInput id='vehiclemodal' type='text' value={vmodel} onChange={(e) => { setvModel(e.target.value) }}/>
    let VehicleSeats = isVehicle ? user.VehicleSeats:<MDBInput id='vehicleseat' type='text' value={vseat} onChange={(e) => { setvSeat(e.target.value) }}/>
    let VehicleYear = isVehicle ? user.VehicleYear:<MDBInput id='vehicleyear' type='text' value={vyear} onChange={(e) => { setvYear(e.target.value) }}/>

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1">User</p>
                                <p className="text-muted mb-4">Regina, SK</p>
                                <div className="d-flex justify-content-center mb-2">
                                    {isadmin}
                                    {/* <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>First Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.name}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Last name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.lastname}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Mobile</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(639) 555-5672</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Regina, SK</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="15">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">*</span> Vehicle Details</MDBCardText>
                                        <Container>
                                            <Row>
                                                <Col><MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Vehicle Name</MDBCardText>
                                                        {vehicleName}
                                                    </Col>
                                                <Col><MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Vehicle Make</MDBCardText>
                                                    {VehicleMake}</Col>
                                            </Row>
                                            <Row>
                                                <Col><MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Vehicle Model</MDBCardText>
                                                    {VehicleModel}</Col>
                                                <Col>
                                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Seats</MDBCardText>
                                                    {VehicleSeats}
                                                </Col>
                                                <Col><MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Vehicle Year</MDBCardText>
                                                    {VehicleYear}</Col>
                                            </Row>
                                        </Container>
                                        <Container className='text-center p-3'>
                                        {!isVehicle && <MDBBtn onClick={setVehicleDetails}>Submit Details</MDBBtn>}
                                        </Container>
                                        
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                        </MDBRow>
                        <Container className='mb-5'></Container>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}