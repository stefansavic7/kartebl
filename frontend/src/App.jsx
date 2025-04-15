import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Tickets from "./pages/Tickets";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CreateEvent from "./pages/CreateEvent";
import { EventList } from "./pages/EventList";
import ShowEvent from "./components/ShowEvent";
import { useCallback, useEffect, useState } from "react";
import { OrganizatorEvents } from "./pages/OrganizatorEvents";

const AppContent = () => {
  const location = useLocation();

  // Initialize approvedEvents from localStorage unless on Home ("/")
  const initialApprovedEvents =
    location.pathname === "/"
      ? []
      : localStorage.getItem("approvedEvents")
      ? JSON.parse(localStorage.getItem("approvedEvents"))
      : [];

  const [approvedEvents, setApprovedEvents] = useState(initialApprovedEvents);

  // Clear approvedEvents when navigating to Home
  useEffect(() => {
    if (location.pathname === "/") {
      setApprovedEvents([]);
    }
  }, [location.pathname]);

  const updateRoutes = useCallback((eventId) => {
    setApprovedEvents((prev) => {
      if (!prev.includes(eventId)) {
        return [...prev, eventId];
      }
      return prev;
    });
  }, []);

  // Always update localStorage to reflect the current approvedEvents state.
  useEffect(() => {
    localStorage.setItem("approvedEvents", JSON.stringify(approvedEvents));
  }, [approvedEvents]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home updateRoutes={updateRoutes} />} />
        <Route path="kontakt" element={<Contact />} />
        <Route path="karte" element={<Tickets />} />
        <Route path="info" element={<About />} />
        <Route path="profil" element={<Profile />} />
        <Route path="createEvent" element={<CreateEvent />} />
        <Route path="eventList" element={<EventList />} />
        <Route path="prijava" element={<Login />} />
        <Route path="registracija" element={<Registration />} />
        <Route path="organizatorEvents" element={<OrganizatorEvents />} />

        {/* Dynamically Add Routes for Approved Events */}
        {approvedEvents.map((eventId) => (
          <Route
            key={eventId}
            path={`${eventId}`}
            element={<ShowEvent id={eventId} numberOfTickets={0}/>}
          />
        ))}

        <Route path="*" element={<div>ERROR 404</div>} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;