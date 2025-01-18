{/* Ova stranica prikazuje listu dogadjaja Administratoru. Administrator moze pregledati, odobriti ili odbaciti dogadjaj */}
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";



export const EventList =()=>{

    const[events,setEvents]=useState([]);
    //const[loading,setLoading]=useState(true);  //indikator ucitavanja
    const[error,setError]=useState(null);

    const fetchEvents= async ()=>{
        console.log("stigao saam!")
        try{
            const response=await axios.get(`http://localhost:9000/dogadjaji`);
            setEvents(response.data);
            //setLoading(false);
        }catch(err){
            console.error("Greska prilikom ucitavanja dogadjaja:",err);
            setError("Ne možemo ucitati dogadjaje. Probajte kasnije.");
            //setLoading(false);
        }
    };

    useEffect(()=>{
        fetchEvents();
    },[]);

    return(
        <div>
            Lista dogadjaja:
        </div>
    );
    
};

//ovde sam stigao. ucitao sam dogadjaje iz baze, sad ih trebam prikazati.