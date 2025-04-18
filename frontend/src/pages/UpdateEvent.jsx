import Input from "../components/Input"; 
import Event from "../components/Event";
import EventPreview from "../components/EventPreview";
import React, { useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";

const UpdateEvent = ()=>{

    const [event, setEvent] = useState(null);
    const [id,setID]= useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
        try {
            setID(JSON.parse(localStorage.getItem("updateEvent")));
            if(id){
            const response = await axios.get(`http://localhost:9000/dogadjaji/${id}`); 
            setEvent(response.data);}
            
        } catch (error) {
            alert("An error occurred while fetching event.");
        }
        };
        fetchEvent();
    }, [id]); 



    const [numberOfTickets, setNumberOfTickets] = useState(null);
      
        
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
    const [nazivv, setNaziv] = useState("");
    const [lokacijaa, setLokacija] = useState("");
    const [opiss, setOpis] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [errors, setErrors] = useState({ date: '', time: '' });

    const [minTickets, setMinTickets] = useState(null);

    useEffect(() => {
        let url;
        if (event) {
          setDate(event.datum);
          setTime(event.vrijeme);
          setNaziv(event.naziv);
          setLokacija(event.lokacija);
          setOpis(event.opis);
          setNumberOfTickets(event.karte.length);
          setMinTickets(event.karte.length);
          async function getImage(){
            const imageResponse = await fetch(`http://localhost:9000/dogadjaji/dogadjaj/${id}/slika`);
             if (!imageResponse.ok) {
               alert("Failed to fetch image");
               return;
             }
            const imageBlob = await imageResponse.blob();
            url=URL.createObjectURL(imageBlob)
            setShowIMG(url);
          }
          getImage();
          
        }
        return () => {                         
          if (url) {
            URL.revokeObjectURL(url);
          }
        }
      }, [event]);

    useEffect(() => {
      if (time.length > 0 && time.length < 6) {
        setTime(prev => prev + ':00');
      }
    }, [time]);

    const handleNumberOfTicketsChange = (e) => {
      const value =Math.max(minTickets,Number(e.target.value)) ;
      setNumberOfTickets(value);
    };

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
          let naziv = document.getElementsByName("Naslova")[0]?.value || "";
          const datum = document.getElementsByName("Datuma")[0]?.value || "";
          let lokacija = document.getElementsByName("Lokacijaa")[0]?.value || "";
          const opis = document.getElementsByName("Opisa")[0]?.value || "";
          
          let formattedDatum = datum.replace(/\.$/, "").split(".").reverse().join("-");
          if(formattedDatum[4]!=='-')
            formattedDatum=date;
   
          
          const token = JSON.parse(localStorage.getItem("token"));
          if (!token) {
            alert("No token found. Please log in.");
            return;
          }
    
          const decodedToken = jwtDecode(token);
          const email=decodedToken.sub;
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
          let odobren="";
          if((event.odobren==="aktivan")||(event.odobren==="sakriven")) 
            odobren = "azuriran";
          else
            odobren = "zahtjev";

          if(naziv==="")
            naziv=nazivv;
          if(lokacija==="")
            lokacija=lokacijaa;
        
          const event1 = {
            naziv,
            datum: formattedDatum,
            vrijeme:time,
            lokacija,
            opis,
            administratorId: event.administratorId,
            organizatorId,
            odobren,
          };
        
          const formData = new FormData();
          const jsonBlob = new Blob([JSON.stringify(event1)], { type: "application/json" });
          formData.append("podaci", jsonBlob);
          if(!file){
          const imageResponse = await fetch(`http://localhost:9000/dogadjaji/dogadjaj/${id}/slika`);
             if (!imageResponse.ok) {
               alert("Failed to fetch image");
               return;
             }
            const imageBlob = await imageResponse.blob();
            formData.append("slika", imageBlob);
        }else{
            formData.append("slika", file);
        }
          
          try {
            const response = await fetch(`http://localhost:9000/dogadjaji/updateDogadjaj/${id}`, {
                method: "PUT",
                headers: {
                "Authorization": `Bearer ${token}`, 
                },
                body: formData,
            });
        
            if (!response.ok) {
                const errorText = await response.text();
                alert("Failed to update event: " + errorText);
                return;
            }
        
            const result = await response.json();
            alert("Event Updated Successfully");
        } catch (error) {
            alert("An error occurred while updating the event: " + error);
        }
        for (let i = 0; i < minTickets; i++) {
          const maxBrojKarata = document.getElementsByName("NumTicketsa" + i)[0]?.value;
          const karta = {
            cijena:event.karte[i].cijena,
            vrstaKarte:event.karte[i].vrstaKarte,
            dogadjajId: event.id,
            organizatorId: event.organizatorId,
            maxBrojKarata
          };
    
          try {
            const response1 = await fetch(`http://localhost:9000/karte/update/${event.karte[i].id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify(karta),
            });
    
            if (!response1.ok) {
              alert("Failed to update ticket");
            }
          } catch (error1) {
            alert("An error occurred while creating the ticket: " + error1);
          }
        }
        for (let i = 0; i < numberOfTickets-minTickets; i++) {
          const maxBrojKarata = document.getElementsByName("NumTicketsaa" + i)[0]?.value;
          const cijena = document.getElementsByName("Cijenaaa" + i)[0]?.value;
          const vrstaKarte = document.getElementsByName("Kartaaa" + i)[0]?.value;
          const karta = {
            cijena,
            vrstaKarte,
            dogadjajId: event.id,
            organizatorId: event.organizatorId,
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
    }

    return(
        <div className="flex flex-col items-center justify-center m-10">
            <Input name="Naslova" fieldType='outlined-required' labelText = 'Naslov dogadjaja'></Input>
            <div className="flex flex-col items-center justify-center bg-zinc-200 rounded-2xl p-10 w-[20rem] h-[14rem] my-5">
                <input type="file" id="fileInput" onChange={handleFileChange} className="hidden"/>
                <label htmlFor="fileInput" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer">
                    {file ? "Promijenite sliku" : "Izaberite sliku"}
                </label>
                <p className="m-5">
                    {file ?  `${file.name}` : ""}
                </p>
            </div>


            <Input name="Lokacijaa"fieldType='outlined-required' labelText = 'Lokacija dogadjaja'></Input>
            <Input name="Datuma"fieldType='outlined-required' labelText = 'Datum dogadjaja (dd.mm.yyyy.)'  onBlur={handleDateChange}></Input>
            {errors.date && <p className="text-red-600">{errors.date}</p>}
            <Input name="Vrijemea"fieldType='outlined-required' labelText = 'Vrijeme dogadjaja (hh:mm)' onBlur={handleTimeChange}></Input>
            {errors.time && <p className="text-red-600">{errors.time}</p>}
            <Input name="Opisa"fieldType='textArea' size = '70.5rem'rows = {10} labelText = 'Unesite opis događaja*' defaultValue ={opiss} helperText='' maxHh='100rem'></Input>
            {minTickets && event &&( 
            <div className="flex flex-col items-center justify-center m-5">
              <Input name={"Numa"} id= "numTicketsa"fieldType="number" labelText="Unesite broj vrsta karata" defaultValue={minTickets} minValue={minTickets}
                onChange={(e) => {
                  handleNumberOfTicketsChange(e);
                }}/>
              <div className="bg-zinc-200 space-y-4 rounded-2xl p-10 mt-5">
                {Array.from({ length: minTickets}).map((_, index) => (
                  <div key={index} className="flex bg-white rounded-2xl p-5">
                    <Input name={"Kartaa"+index}fieldType="outlined-disabled" defaultValue={event.karte[index].vrstaKarte} labelText="Naziv karte" />
                    <Input name={"Cijenaa"+index}fieldType="outlined-disabled" labelText="Cijena karte u KM*" defaultValue={event.karte[index].cijena} />
                    {/*<Input name={"BonusInfo"+add+index}fieldType="outlined-required" labelText="Dodatne informacije" />*/}
                    <Input name={"NumTicketsa"+index}fieldType="number" labelText="Broj karata*" defaultValue={event.karte[index].maxBrojKarata} minValue={event.karte[index].brojProdatihKarata} maxValue={100000}/>
                  </div>
                ))}
              </div>
              { (numberOfTickets-minTickets>0)&&
              <div className="bg-zinc-200 space-y-4 rounded-2xl p-10 mt-5">
              {Array.from({ length: numberOfTickets-minTickets}).map((_, index) => (
                <div key={index} className="flex bg-white rounded-2xl p-5">
                  <Input name={"Kartaaa"+index}fieldType="outlined-required" labelText="Naziv karte" />
                  <Input name={"Cijenaaa"+index}fieldType="outlined-required" labelText="Cijena karte u KM*" />
                  {/*<Input name={"BonusInfo"+add+index}fieldType="outlined-required" labelText="Dodatne informacije" />*/}
                  <Input name={"NumTicketsaa"+index}fieldType="number" labelText="Broj karata*"  minValue={1} maxValue={100000}/>
                </div>
              ))}
              </div>
              }
              </div>
            )}
            <Event
              key={refreshKey} 
              Picture={showIMG} 
              Title={document.getElementsByName("Naslova")[0]?.value ? document.getElementsByName("Naslova")[0]?.value : (event===null)?"":event.naziv} 
              Date={(document.getElementsByName("Datuma")[0]?.value ? document.getElementsByName("Datuma")[0]?.value : (event===null)?"":event.datum.split('-').reverse().join('.') + '.') +" u "+ 
                (document.getElementsByName("Vrijemea")[0]?.value ? document.getElementsByName("Vrijemea")[0]?.value : (event===null)?"":event.vrijeme.slice(0, 5) )+"h"} 
              Location={document.getElementsByName("Lokacijaa")[0]?.value ? document.getElementsByName("Lokacijaa")[0]?.value : (event===null)?"":event.lokacija} 
              Lnk={false}>
            </Event>
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
                naslov={document.getElementsByName("Naslova")[0]?.value ? document.getElementsByName("Naslova")[0]?.value : (event===null)?"":event.naziv}
                showIMG={showIMG}
                lokacija={document.getElementsByName("Lokacijaa")[0]?.value ? document.getElementsByName("Lokacijaa")[0]?.value : (event===null)?"":event.lokacija}
                datum={(document.getElementsByName("Datuma")[0]?.value ? document.getElementsByName("Datuma")[0]?.value : (event===null)?"":event.datum.split('-').reverse().join('.') + '.')}
                vrijeme={(document.getElementsByName("Vrijemea")[0]?.value ? document.getElementsByName("Vrijemea")[0]?.value : (event===null)?"":event.vrijeme.slice(0, 5) )}
                opis={document.getElementsByName("Opisa")[0]?.value}
                tickets={numberOfTickets}
              />
            )}
        </div>

    );

}

export default UpdateEvent;