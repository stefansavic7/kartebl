import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Tickets from "./pages/Tickets";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import axios from 'axios'
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CreateEvent from "./pages/CreateEvent";
import { EventList } from "./pages/EventList";


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="karte" element={<Tickets />} />
          <Route path="info" element={<About />} />
          <Route path="profil" element={<Profile />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="eventList" element={<EventList/>}></Route>
          <Route path="prijava" element={<Login />} />
          <Route path="registracija" element={<Registration />} />
          <Route path="*" element={<div>ERROR 404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
