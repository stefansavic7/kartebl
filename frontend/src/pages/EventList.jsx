{/* Ova stranica prikazuje listu dogadjaja Administratoru. Administrator moze pregledati, odobriti ili odbaciti dogadjaj */}
import { useState } from "react";
import React from "react";
import axios from "axios";



export const EventList =()=>{
    const [eventId,setEventId]=useState("");
    const [eventName,setEventName]=useState("");
    const [erorMessage,setErorMessage]=useState("");

    const fettchEventName=()=>{
        if(eventId===""){
            setErorMessage("morate unijeti id!");
            setEventName("");
            return;
        }

        //slanje get zahtjeva na server

        axios
        .get(`http://localhost:9000/dogadjaji/${eventId}`)
        .then((response)=>{
            setEventName(response.data.naziv);
            setErorMessage("")
        }).catch((error) => {
            setErorMessage("Došlo je do greške. Pokušajte ponovo.");
            setEventName(""); // Očisti naziv ako dođe do greške
        });


    }


    return(
        <div>
            <p>Dogadjaji:</p>
            <div>
                <label>Unesi ID dogadjaja</label>
                <input type="text" 
                id="eventId"
                value={eventId}
                className="border border-gray-300 p-2 rounded w-full"
                onChange={(e)=>setEventId(e.target.value)}
                placeholder="unesi id"
                />
            </div>
            <button
            onClick={fettchEventName}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >Pretrazi</button>

            <div>
                {erorMessage?(
                    <p>{erorMessage}</p>
                ):(
                    eventName && (
                        <p>Naziv dogadjaja: {eventName}</p>
                    )
                )}
            </div>

        </div>
    );
};