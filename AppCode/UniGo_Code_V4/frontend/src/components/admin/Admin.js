import React, { useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useState } from 'react';


var BASE_URL = 'http://18.221.134.12:8080/';


export default function Admin() {
    const [userData, setUserData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get(BASE_URL + 'api/users').then((result) => {
            setUserData(result.data);
        })
    }, [refresh])

    async function deleteUser(id1) {
        axios.get(BASE_URL+'api/admin/deleteuserbyid',{ params: { id: id1 } }).then((result) => {
          if (result.status === 200) {
            setRefresh(true);            
          }
        })
       
           
      }
    return (
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Vehicle</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Actions</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {userData.map((user) => {
                    return (
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{user.name + " " + user.lastname}</p>
                                        <p className='text-muted mb-0'>{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{user.VehicleName!=null?user.VehicleName : "Swift"}</p>
                                <p className='text-muted mb-0'>{user.VehicleMake!=null?user.VehicleMake : "Maruti"}</p>
                            </td>
                            <td>
                                <MDBBadge color='success' pill>
                                    Active
                                </MDBBadge>
                            </td>
                           
                            <td>
                                <MDBBtn color='info' className='me-1' rounded size='sm'>Edit</MDBBtn>
                                <MDBBtn color='danger' className='me-1' rounded size='sm' onClick={()=>deleteUser(user._id)}>Delete</MDBBtn>
                            </td>
                        </tr>
                    )

                })}
       
            </MDBTableBody>
        </MDBTable>
    );
}