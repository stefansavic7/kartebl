import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../components/Event";

const Home = ({ updateRoutes }) => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = () => {
    axios
      .get('http://localhost:9000/dogadjaji')
      .then((response) => {
        setEvents(response.data);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('An error occurred while fetching events.');
      });
  };

  useEffect(() => {
    events.forEach((event) => {
      if(event.odobren === "aktivan")
        updateRoutes(event.id);
    });
  }, [events, updateRoutes]);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {events.length > 0 ? (
        events.map((event, index) => (
          (event.odobren === "aktivan") && (
            <Event
              id={event.id}
              key={index}
              Title={event.naziv}
              Location={event.lokacija}
              Date={`${event.datum.split('-').reverse().join('.')} u ${event.vrijeme.slice(0, 5)}h`}
            />
          ))
        )
      ) : (
        <p>Loading events</p>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Home;