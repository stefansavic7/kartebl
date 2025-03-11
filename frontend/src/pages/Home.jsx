import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../components/Event";

const Home = () => {
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

  return (
    <div className="flex flex-wrap justify-center items-center">
      {events.length > 0 ? (
        events.map((event, index) => {
          
          return (
            <Event
              key={index}
              Picture={`data:image/jpeg;base64,${event.slika}`} // Pass the valid image here
              Title={event.naziv}
              Location={event.lokacija}
              Date={event.datum.split('-').reverse().join('.') + '.' + " u " + event.vrijeme.slice(0, 5) + "h"}
            />
          );
        })
      ) : (
        <p>No events available</p>
      )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Home;
