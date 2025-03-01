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


    const [id, setId] = useState('');
    const [ime, setIme] = useState('');
    const [error, setError] = useState(null);
  
    const handleInputChange = (e) => {
      setId(e.target.value);
    };
  
    const fetchKorisnik = async () => {
      if (!id) {
        setError('Please enter an ID');
        return;
      }
  
      // Get token from localStorage
      const token = localStorage.getItem('token');
  
      if (!token) {
        setError('Token not found. Please log in.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:9000/korisnici/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add token in Authorization header
          },
        });
  
        if (!response.ok) {
          throw new Error('Korisnik not found or unauthorized');
        }
  
        const data = await response.json();
        setIme(data.ime);
        setError(null);  // Clear error if the request is successful
      } catch (err) {
        setIme('');
        setError(err.message);
      }
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


      <h2>Enter ID to get Korisnik's ime</h2>
      <input
        type="text"
        value={id}
        onChange={handleInputChange}
        placeholder="Enter ID"
      />
      <button onClick={fetchKorisnik}>Fetch Ime</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ime && <p><strong>Ime:</strong> {ime}</p>}
    </div>
  );
};

export default Home;
