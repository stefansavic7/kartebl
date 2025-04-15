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
import { UserProvider } from "./utils/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";


const AppContent = () => {
  const location = useLocation();
  
  const initialApprovedEvents =
    location.pathname === "/"
      ? []
      : localStorage.getItem("approvedEvents")
      ? JSON.parse(localStorage.getItem("approvedEvents"))
      : [];

  const [approvedEvents, setApprovedEvents] = useState(initialApprovedEvents);

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
        <Route path="prijava" element={<Login />} />
        <Route path="registracija" element={<Registration />} />
        
        {/* Protected routes for Organizator */}
        <Route 
          path="createEvent" 
          element={
            <ProtectedRoute requiredRole="organizator">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route 
          path="organizatorEvents" 
          element={
            <ProtectedRoute requiredRole="organizator">
              <OrganizatorEvents />
            </ProtectedRoute>
          }
        />
        
        <Route path="eventList" element={<EventList />} />

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
    
  <UserProvider>
    <BrowserRouter>
            <AppContent />
    </BrowserRouter>
  </UserProvider>
    
  );
};

export default App;