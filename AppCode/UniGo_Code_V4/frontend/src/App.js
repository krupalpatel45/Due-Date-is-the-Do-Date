// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import useToken from './libraries/UseToken';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/misc/NotFound';
import TripHistory from './components/triphistory/TripHistory';
import ActiveTrip from './components/activetrip/ActiveTrip';
import { useLoadScript } from '@react-google-maps/api';
import Drive from './components/main/Drive/Drive';
import Ride from './components/main/Ride/Ride';
import RideRequest from './components/main/RideRequest/RideRequest';
import DriveRequest from './components/main/DriveRequest/DriveRequest'
import UseActiveTrip from './libraries/UseActiveTrip';
import Profile from './components/profile/Profile';
import Footer from './components/footer/Footer';
import Contactus from './components/contactus/Contactus';
import Admin from './components/admin/Admin';
import AboutUs from './components/aboutus/AboutUs';

const libraries = ['places'];

function App() {
  const { activeTrip, setActiveTrip } = UseActiveTrip();
  const { token, name, setToken } = useToken(setActiveTrip);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCZcb_AEAcCRk0uxe-GjAtUU_ewjpDXIM",
    libraries
  });

  if (loadError) return <h1>Map load error</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <Router>
      <Navbar setToken={setToken} activeTrip={activeTrip} name={name} />
      <Routes>
        <Route exact path='/' element={<Navigate to="/profile" />} />
        <Route exact path='/login' element={token ? <Navigate to="/" /> : <Login setToken={setToken} setActiveTrip={setActiveTrip} />} />
        <Route exact path='/signup' element={token ? <Navigate to="/" /> : <SignUp setToken={setToken} />} />
        <Route exact path='/profile' element={token ? <Profile setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />} />
        <Route exact path='/drive' element={token ? <Drive setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />} />
        <Route exact path='/ride' element={token ? <Ride setToken={setToken} setActiveTrip={setActiveTrip} name={name} /> : <Navigate to="/login" />} />
        <Route exact path='/ride-request' element={token ? <RideRequest setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />} />
        <Route exact path='/drive-request' element={token ? <DriveRequest setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />} />
        <Route exact path='/trip-history' element={token ? <TripHistory /> : <Navigate to="/login" />} />
        <Route exact path='/aboutus' element={token ? <AboutUs /> : <Navigate to="/login" />} />
        <Route exact path='/contactus' element={token ? <Contactus /> : <Navigate to="/login" />} />
        <Route exact path='/admin' element={token ? <Admin /> : <Navigate to="/login" />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;
