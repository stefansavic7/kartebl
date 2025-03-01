import Input from "../components/Input"; 
import Footer from "../components/Footer";
import Event from "../components/Event";
import React, { useState } from "react";
import ChooseTickets from "../components/ChooseTickets";



function TicketForm() {
  const [numberOfTickets, setNumberOfTickets] = React.useState(1);

  const handleNumberOfTicketsChange = (e) => {
    const value =Math.max(1,Number(e.target.value)) ;
    setNumberOfTickets(value);
  };

  return (
       
    <div className="flex flex-col items-center justify-center m-5">
      <Input name="Num" id= "numTickets"fieldType="number" labelText="Unesite broj vrsta karata" defaultValue={numberOfTickets} minValue={1}
        onChange={(e) => {
          handleNumberOfTicketsChange(e);
          e.target.onChange(e);
        }}/>
      <div className="bg-zinc-200 space-y-4 rounded-2xl p-10 mt-5">
        {Array.from({ length: numberOfTickets }).map((_, index) => (
          <div key={index} className="flex bg-white rounded-2xl p-5">
            <Input name="Karta"fieldType="outlined-required" labelText="Naziv karte" />
            <Input name="Cijena"fieldType="number" labelText="Cijena karte u KM*" minValue={0} maxValue={1000} />
            <Input name="BonusInfo"fieldType="outlined-required" labelText="Dodatne informacije" />
            <Input name="NumTickets"fieldType="number" labelText="Broj karata*" minValue={1} maxValue={1000}/>
          </div>
        ))}
      </div>
    </div>
  );
}

const CreateEvent = ()=>{
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
          setFile(selectedFile);
          setMessage("");
          const imageUrl = URL.createObjectURL(selectedFile); // Use selectedFile instead of file
          setImage(imageUrl);
      }
      };
  
  

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({ date: '', time: '' });

  const validateDate = (value) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\d{4}.$/;
    return dateRegex.test(value) ? '' : 'Pogrešan format. Koristi dd.mm.yyyy.';
  };

  const validateTime = (value) => {
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(value) ? '' : 'Pogrešan format. Koristi hh:mm.';
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    setErrors((prev) => ({ ...prev, date: validateDate(value) }));
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTime(value);
    setErrors((prev) => ({ ...prev, time: validateTime(value) }));
  };

  const [isVisible, setIsVisible] = useState(false);
    
  const openDiv = () => {
    document.documentElement.classList.add("overflow-hidden");
    setIsVisible(true);
  }
  const closeDiv = () => {
    document.documentElement.classList.remove("overflow-hidden");
    setIsVisible(false);
  }
 
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshEvent = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };  

  const [isCheckVisible, setIsCheckVisible] = useState(false);
    
    const openCheck = () => {
      document.documentElement.classList.add("overflow-hidden");
      setIsCheckVisible(true);
    }
    const closeCheck = () => {
      document.documentElement.classList.remove("overflow-hidden");
      setIsCheckVisible(false);
    }

    const handleSubmit = async () => {
      const naziv = document.getElementsByName("Naslov")[0]?.value || "";
      const datum = document.getElementsByName("Datum")[0]?.value || "";
      const vrijeme = (document.getElementsByName("Vrijeme")[0]?.value + ":00") || ""; 
      const lokacija = document.getElementsByName("Lokacija")[0]?.value || "";
      const opis = document.getElementsByName("Opis")[0]?.value || "";
      
      const formattedDatum = datum.replace(/\.$/, "").split(".").reverse().join("-");
      // Convert to YYYY-MM-DD
  
      const token = localStorage.getItem("token");
      if (!token) {
          alert("No token found. Please log in.");
          return;
      }
  
      const administratorId = document.getElementsByName("AdministratorId")[0]?.value || "6";
      const organizatorId = "2"; // Temporary hardcoded value
      const odobren = "0";
      const tip_slike = "image/png";
  
      console.log("Formatted Date:", formattedDatum);
      
      // ✅ Fix: Ensure `image` exists
      const slika = image || ""; 
      console.log("Image URL:", slika); 
  
      // Event object
      const event = { naziv, datum: formattedDatum, vrijeme, lokacija, opis, slika, administratorId, organizatorId, odobren, tip_slike };
  
      try {
        const response = await fetch("http://localhost:9000/dogadjaji", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(event),
        });
    
        const responseText = await response.text(); // Get full response text
        console.log("Response Status:", response.status);
        console.log("Response Body:", responseText);
        console.log("Token:", token);
        
    
        if (response.ok) {
            const result = JSON.parse(responseText);
            alert(`Event Created Successfully:\n${JSON.stringify(result, null, 2)}`);
        } else {
            alert(`Failed to create event.\nServer Response: ${responseText}`);
            console.log(`Failed to create event.\nServer Response: ${responseText}`);
        }
    } catch (error) {
        console.error("Error creating event:", error);
        alert("An error occurred while creating the event.");
    }
  };
    
      
    return(
        <div className="flex flex-col items-center justify-center m-10">
            <Input name="Naslov" fieldType='outlined-required' labelText = 'Naslov dogadjaja'></Input>
            <div className="flex flex-col items-center justify-center bg-zinc-200 rounded-2xl p-10 w-[20rem] h-[14rem] my-5">
                <input type="file" id="fileInput" onChange={handleFileChange} className="hidden"/>
                <label htmlFor="fileInput" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer">
                    {file ? "Promijenite sliku" : "Izaberite sliku"}
                </label>
                <p className="m-5">
                    {file ?  `${file.name}` : ""}
                </p>
              
                {message && <p>{message}</p>}
            </div>


            <Input name="Lokacija"fieldType='outlined-required' labelText = 'Lokacija dogadjaja'></Input>
            <Input name="Datum"fieldType='outlined-required' labelText = 'Datum dogadjaja (dd.mm.yyyy.)' defaultValue={date} onBlur={handleDateChange}></Input>
            {errors.date && <p className="text-red-600">{errors.date}</p>}
            <Input name="Vrijeme"fieldType='outlined-required' labelText = 'Vrijeme dogadjaja (hh:mm)' defaultValue={time} onBlur={handleTimeChange}></Input>
            {errors.time && <p className="text-red-600">{errors.time}</p>}
            <Input name="Opis"fieldType='textArea' size = '70.5rem'rows = {10} labelText = 'Unesite opis događaja*' defaultValue ="" helperText='' maxHh='100rem'></Input>
            <TicketForm></TicketForm>
            <Event key={refreshKey} Picture={image} Title={document.getElementsByName("Naslov")[0]?.value} Date={document.getElementsByName("Datum")[0]?.value +" u "+ document.getElementsByName("Vrijeme")[0]?.value+"h"} Location={document.getElementsByName("Lokacija")[0]?.value}></Event>
            <div className="flex gap-10">
                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]"onClick={refreshEvent}>
                  Osvježi
                </button>
                <button className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]" onClick={openDiv}>
                    Pregledaj
                </button>
                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]"onClick={openCheck}>
                    Pošalji zahtjev za objavu
                </button>
                
                {isCheckVisible && (
                  <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-80 flex flex-col items-center justify-center">
                      <div className="flex justify-between items-center gap-16 mb-10 ml-2 mr-2">
                        <h2 className="text-lg font-semibold">Potvrdi slanje zahtjeva</h2>
                        <button onClick={closeCheck} className="text-gray-500 hover:text-gray-800 text-2xl">
                          &times;
                        </button>
                      </div>
                        <span >Da li ste sigurni da</span><span> želite da pošaljete zahtjev </span><span>za objavu događaja?</span>
                      <button className="mt-10 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms] w-full h-10" onClick={handleSubmit}>
                         Pošalji zahtjev
                      </button>
                    </div>
                  </div>
                )}
                
            </div>
            {isVisible && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-40">
                <div className=" w-full h-full bg-white shadow-lg overflow-y-auto z-30 flex flex-col items-center justify-start">
                  <button  onClick={closeDiv} className="text-gray-500 hover:text-gray-800 text-2xl z-50 ml-[90rem] text-3xl mt-5">
                    <b>&times;</b>
                  </button>
                  <span  className="z-50 text-3xl"><b>{document.getElementsByName("Naslov")[0]?.value}</b></span>
                  {image && <img src={image} alt="Slika" className="rounded shadow-lg w-[70%] h-auto my-10"/>}
                  <div className="flex flex-row text-2xl justify-between space-x-[38rem] font-bold">
                    <div className="flex pl-3 gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="size-6"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 1.144.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"clipRule="evenodd"/></svg>
                      <div>{document.getElementsByName("Lokacija")[0]?.value}</div>
                    </div>
                    <div className="flex pr-3 pb-10 gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="size-6 mt-1"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd"/></svg>
                      <div>{document.getElementsByName("Datum")[0]?.value}</div> u 
                      <div>{document.getElementsByName("Vrijeme")[0]?.value}h</div>
                    </div>
                  </div>
                  <div className="w-[65rem]  whitespace-pre-wrap">
                    {document.getElementsByName("Opis")[0]?.value}
                  </div>
                  
                  <div className="flex flex-col justify-center items-center bg-zinc-200 rounded-2xl px-10 my-5">
                    <span className="text-2xl font-bold mb-5">Karte</span>
                    {Array.from(document.getElementsByName("Karta")).map((karta, index) => {
                    const cijenaInput = document.getElementsByName("Cijena")[index];
                    const bonusInfoInput = document.getElementsByName("BonusInfo")[index];

                    return (
                      <div key={index} className=" flex flex-col mb-5 rounded-2xl p-2 justify-center items-center bg-[#282231] text-white">
                        <span className="font-bold text-xl ">{karta?.value}</span>
                        <div className="bg-white rounded-xl text-black m-2 p-2">
                          <div><b>Cijena:</b> {cijenaInput?.value} KM</div>
                          <div><b>{bonusInfoInput?.value&&"Dodatne Informacije:"}</b> {bonusInfoInput?.value}</div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                  <ChooseTickets></ChooseTickets>
                  <Footer></Footer>
                </div>
              </div>
            )}
        </div>

    );

}

export default CreateEvent;