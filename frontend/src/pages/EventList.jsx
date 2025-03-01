import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import RibljaCorba from "../assets/RibljaCorba.jpg";
import Zdravko from "../assets/Zdravko.jpeg";

export const EventList = () => {

  
/*
  const events = [
    {
      id: 1,
      name: "Naziv Događaja",
      date: "01.03.2025",
      image: Zdravko,
      approved: true,
    },
    {
      id: 2,
      name: "Naziv Drugog Događaja",
      date: "05.03.2025",
      image: RibljaCorba,
      approved: false,
    },
    {
      id: 3,
      name: "Naziv Trećeg Događaja",
      date: "10.03.2025",
      image: Zdravko,
      approved: true,
    },
  ];
  */

   //ovde stao. nastaviti sa preuzimanjem tokena.





  return (
    
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      
      
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Lista Događaja</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white shadow-lg rounded-2xl overflow-hidden ${event.approved ? 'border border-green-500' : ''}`}
            >
              <div className="flex flex-col sm:flex-row">
                <img 
                  src={event.image} 
                  alt={`Slika ${event.name}`} 
                  className="w-full sm:w-32 h-32 object-cover">
                    </img>
                <div
                  className={`p-4 flex-1 relative ${event.approved ? 'bg-green-100' : ''}`}
                >
                  {event.approved && (
                    <div className="absolute bottom-2 right-2 text-green-500 font-bold text-2xl opacity-80">
                    Odobren
                  </div>
                  )}
                  <h2 className="text-xl font-semibold">{event.name}</h2>
                  <p className="text-gray-600">Datum: {event.date}</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600">
                    Pogledaj
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
