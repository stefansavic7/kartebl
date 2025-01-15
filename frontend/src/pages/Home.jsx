import Event from "../components/Event";
import Zdravko from "../assets/zdravko.jpeg";
import RibljaCorba from "../assets/RibljaCorba.jpg";
import axios from "axios";
import React, { useState } from "react";




 
const Home = () => {
   // Initialize adminId as a number
   /*
   const [adminId, setAdminId] = useState('');
   const [adminName, setAdminName] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
 
   const handleInputChange = (e) => {
     const id = e.target.value;
 
     // Only set the adminId if the input is a valid number
     if (id !== '' && !isNaN(id)) {
       setAdminId(id);
       fetchAdminName(id); // Fetch the admin data
     } else {
       setAdminId('');
       setAdminName('');
       setErrorMessage('');
     }
   };
 
   const fetchAdminName = (id) => {
     axios
       .get(`http://localhost:9000/dogadjaji/${id}`)
       .then((response) => {
         // Assuming 'naziv' is the admin name
         setAdminName(response.data.naziv || '');
         setErrorMessage(''); // Clear error message if successful
       })
       .catch((error) => {
         if (error.response && error.response.status === 404) {
           setAdminName('');
           setErrorMessage('Not found');
         } else {
           setAdminName('');
           setErrorMessage('An error occurred. Please try again.');
         }
       });
     }
       */
 
       
  return (
    <div className="flex flex-wrap justify-center items-center">
      <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
      <Event Picture={RibljaCorba} Title="Koncert Riblje Corbe" Location="Akvana" Date="30.11.2025."></Event>
      <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
      <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
      <Event Picture={RibljaCorba} Title="Koncert Riblje Corbe" Location="Akvana" Date="30.11.2025."></Event>

    </div>
    
  )
}

export default Home