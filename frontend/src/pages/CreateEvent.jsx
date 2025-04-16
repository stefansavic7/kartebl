import Input from "../components/Input"; 
import Event from "../components/Event";
import EventPreview from "../components/EventPreview";
import React, { useState} from "react";
import { jwtDecode } from "jwt-decode";



export function TicketForm({ numberOfTickets, setNumberOfTickets, add="" }) {

  const handleNumberOfTicketsChange = (e) => {
    const value =Math.max(1,Number(e.target.value)) ;
    setNumberOfTickets(value);
  };

  return (
       
    <div className="flex flex-col items-center justify-center m-5">
      <Input name={"Num"+add} id= "numTickets"fieldType="number" labelText="Unesite broj vrsta karata" defaultValue={numberOfTickets} minValue={1}
        onChange={(e) => {
          handleNumberOfTicketsChange(e);
        }}/>
      <div className="bg-zinc-200 space-y-4 rounded-2xl p-10 mt-5">
        {Array.from({ length: numberOfTickets }).map((_, index) => (
          <div key={index} className="flex bg-white rounded-2xl p-5">
            <Input name={"Karta"+add+index}fieldType="outlined-required" labelText="Naziv karte" />
            <Input name={"Cijena"+add+index}fieldType="number" labelText="Cijena karte u KM*" minValue={0} maxValue={1000} />
            {/*<Input name={"BonusInfo"+add+index}fieldType="outlined-required" labelText="Dodatne informacije" />*/}
            <Input name={"NumTickets"+add+index}fieldType="number" labelText="Broj karata*" minValue={1} maxValue={100000}/>
          </div>
        ))}
      </div>
    </div>
  );
}

const CreateEvent = ()=>{
    const [numberOfTickets, setNumberOfTickets] = useState(1);
  
    
    const [file, setFile] = useState(null);
    const [showIMG, setShowIMG] = useState("");

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
          setFile(selectedFile);
          const imageUrl = URL.createObjectURL(selectedFile);
          setShowIMG(imageUrl);
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
    return timeRegex.test(value) ? '' : 'Pogrešan format. Koristi hh:mm';
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
    
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const email=decodedToken.sub;
      console.log(decodedToken);
      const response1 = await fetch('http://localhost:9000/organizatori/email/'+`${email}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          }
      });

      if (!response1.ok) {
          alert("Failed getting ID");
          return;
      }
      const data = await response1.json();
      const organizatorId =data.id;
      console.log("ORGANIZATOR ID: "+organizatorId);
    
      const administratorId = "2";
      const odobren = "zahtjev";
    
      const event = {
        naziv,
        datum: formattedDatum,
        vrijeme,
        lokacija,
        opis,
        administratorId,
        organizatorId,
        odobren,
      };
    
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(event)], { type: "application/json" });
      formData.append("podaci", jsonBlob);
      formData.append("slika", file);
    
      try {
        const response = await fetch("http://localhost:9000/dogadjaji/insertDogadjaj", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, 
          },
          body: formData,
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          alert("Failed to create event: " + errorText);
          return;
        }
    
        const result = await response.json();
        alert("Event Created Successfully");
    
        for (let i = 0; i < numberOfTickets; i++) {
          const maxBrojKarata = document.getElementsByName("NumTickets" + i)[0]?.value;
          const cijena = document.getElementsByName("Cijena" + i)[0]?.value;
          const vrstaKarte = document.getElementsByName("Karta" + i)[0]?.value;
          const karta = {
            cijena,
            vrstaKarte,
            dogadjajId: result.id,
            organizatorId,
            maxBrojKarata
          };
    
          try {
            const response1 = await fetch("http://localhost:9000/karte", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify(karta),
            });
    
            if (!response1.ok) {
              alert("Failed to create ticket");
            }
          } catch (error1) {
            alert("An error occurred while creating the ticket: " + error1);
          }
        }
      } catch (error) {
        alert("An error occurred while creating the event: " + error);
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
            </div>


            <Input name="Lokacija"fieldType='outlined-required' labelText = 'Lokacija dogadjaja'></Input>
            <Input name="Datum"fieldType='outlined-required' labelText = 'Datum dogadjaja (dd.mm.yyyy.)' defaultValue={date} onBlur={handleDateChange}></Input>
            {errors.date && <p className="text-red-600">{errors.date}</p>}
            <Input name="Vrijeme"fieldType='outlined-required' labelText = 'Vrijeme dogadjaja (hh:mm)' defaultValue={time} onBlur={handleTimeChange}></Input>
            {errors.time && <p className="text-red-600">{errors.time}</p>}
            <Input name="Opis"fieldType='textArea' size = '70.5rem'rows = {10} labelText = 'Unesite opis događaja*' defaultValue ="" helperText='' maxHh='100rem'></Input>
            <TicketForm numberOfTickets={numberOfTickets} setNumberOfTickets={setNumberOfTickets}></TicketForm>
            <Event key={refreshKey} Picture={showIMG} Title={document.getElementsByName("Naslov")[0]?.value} Date={(document.getElementsByName("Datum")[0]?.value||"") +" u "+ (document.getElementsByName("Vrijeme")[0]?.value||"")+"h"} Location={document.getElementsByName("Lokacija")[0]?.value} Lnk={false}></Event>
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
            {isVisible&&(
              <EventPreview
                isVisible={isVisible}
                closeDiv={closeDiv}
                naslov={document.getElementsByName("Naslov")[0]?.value}
                showIMG={showIMG}
                lokacija={document.getElementsByName("Lokacija")[0]?.value}
                datum={document.getElementsByName("Datum")[0]?.value}
                vrijeme={document.getElementsByName("Vrijeme")[0]?.value}
                opis={document.getElementsByName("Opis")[0]?.value}
                tickets={numberOfTickets}
              />
            )}
        </div>

    );

}

export default CreateEvent;