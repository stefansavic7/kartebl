import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import AdminEventHandle from "../components/AdminEventHandle";

//ovoj komponenti pristupa administrator.
export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:9000/dogadjaji", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const mappedEvents = response.data.map(event => ({
          id: event.id,
          naziv: event.naziv,
          datum: event.datum,
          vrijeme: event.vrijeme,
          opis: event.opis,
          lokacija: event.lokacija,
          slika: event.slika 
            ? `data:${event.tipSlike};base64,${event.slika}` 
            : "default-image.jpg",
          databasePicture: event.slika,
          type: event.tipSlike,
          odobren: event.odobren,
          organizatorId: event.organizatorId,
          administratorId: event.administratorId,
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Greška pri učitavanju događaja:", error);
      }
    };

    fetchEvents();
  }, []);

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const removeEvent = (deletedEvent)=> {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEvent.id)
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Lista Događaja</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white shadow-lg rounded-2xl overflow-hidden ${event.odobren ? 'border border-green-500' : ''}`}
            >
              <div className="flex flex-col sm:flex-row">
                <img 
                  src={event.slika} 
                  alt={`Slika ${event.naziv}`} 
                  className="w-full sm:w-32 h-32 object-cover">
                </img>
                <div className={`p-4 flex-1 relative ${event.odobren ? 'bg-green-100' : ''}`}>
                  {event.odobren===1 && (
                    <div className="absolute top-1 right-1 text-green-500 font-bold text-sm opacity-80">
                    Odobren
                  </div>
                  
                  )}
                  <h2 className="text-xl font-semibold">{event.naziv}</h2>
                  <p className="text-gray-600">Datum: {event.datum}</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600" 
                    onClick={() => setSelectedEvent(event)}>
                    Pogledaj
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <AdminEventHandle isVisible={!!selectedEvent} setIsVisible={() => setSelectedEvent(null)} event={selectedEvent} updateEvent={updateEvent} removeEvent={removeEvent}/>
      )}
    </div>
  );
};
