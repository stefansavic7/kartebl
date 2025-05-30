import { useState } from "react";
import Event from "./Event";
import EventPreview from "./EventPreview";
import Input from "./Input";
import {jwtDecode} from 'jwt-decode'

const AdminEventHandle = ({ isVisible, setIsVisible , event}) =>{

    const[isEventPreviewVisable,setIsEventPreviewVisable]=useState(false);
    const[isApproveVisable,setIsApproveVisable]=useState(false);
    const[isRejectVisable,setIsRejectVisable]=useState(false);
    const[isDeleteVisable,setIsDeleteVisable]=useState(false);
    const[isUkloniVisable,setIsUkloniVisable]=useState(false);

    const openPreview = () => {
        document.documentElement.classList.add("overflow-hidden");
        setIsEventPreviewVisable(true);
    }
      const closePreview = () => {
        document.documentElement.classList.remove("overflow-hidden");
        setIsEventPreviewVisable(false);
    }

    const setOdobren= async(num)=>{
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                alert("No token found. Please log in.");
                return;
            }
            const decodedToken = jwtDecode(token);
            const email=decodedToken.sub;
            const response1 = await fetch('http://localhost:9000/administratori/email/'+`${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
  
            if (!response1.ok) {
                alert("Failed getting ID");
                return;
            }
            const data = await response1.json();
            event.administratorId=data.id;

            if(event.odobren==="azuriran" && num==="odbijen")
                num="azuriran odbijen";
            
            
            const e = {
                naziv: event.naziv,
                datum: event.datum,
                vrijeme: event.vrijeme,
                lokacija: event.lokacija,
                opis: event.opis,
                administratorId: data.id,
                organizatorId: event.organizatorId,
                odobren: num
              };

            
              const formData = new FormData();
              const jsonBlob = new Blob([JSON.stringify(e)], { type: "application/json" });
              formData.append("podaci", jsonBlob);

             const imageResponse = await fetch(`http://localhost:9000/dogadjaji/dogadjaj/${event.id}/slika`);
             if (!imageResponse.ok) {
               alert("Failed to fetch image");
               return;
             }
             const imageBlob = await imageResponse.blob();
             formData.append("slika", imageBlob);

            const response = await fetch(`http://localhost:9000/dogadjaji/updateDogadjaj/${event.id}`, {
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
            alert("An error occurred while creating the event: " + error);
        }
        setIsApproveVisable(false);
        setIsRejectVisable(false);
        setIsVisible(false);
        window.location.reload();
    }

    const deleteEvent= async()=>{
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                alert("No token found. Please log in.");
                return;
            }
            const response = await fetch(`http://localhost:9000/dogadjaji/${event.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
  
            if (!response.ok) {
                alert("Failed deleting event");
                return;
            }
        } catch (error) {
            alert("An error occurred: "+error);
        }
        setIsDeleteVisable(false);
        setIsVisible(false);
        window.location.reload();
    }

    return(
        <div>
             {isVisible&&(
                <div className="z-49 fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white text-white p-4 rounded shadow-lg w-180 flex flex-col items-center justify-center mt-16">
                        <div className="flex flex-col justify-between items-center">
                            <div className="flex justify-between items-center gap-[14rem] mb-5 ml-2 mr-2">
                                <h2 className="text-lg text-black font-semibold pl-[15rem]">Zahtjev za objavu dogadjaja</h2>
                                <button onClick={() => setIsVisible(false)} className="text-black hover:text-gray-400 text-2xl">
                                &times;
                                </button>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <Event
                                    Picture={`http://localhost:9000/dogadjaji/dogadjaj/${event.id}/slika`}
                                    Title={event.naziv}
                                    Location={event.lokacija}
                                    Date={event.datum.split('-').reverse().join('.') + '.' + " u " + event.vrijeme.slice(0, 5) + "h"}
                                    Lnk={false}>
                                 </Event>
                            </div>
                            <div className="flex flex-row justify-between items-center gap-8">
                                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]" onClick={() => openPreview()}>
                                    Pregledaj
                                </button>
                                {(event.odobren!=="aktivan")&&
                                <button className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]"onClick={() => setIsApproveVisable(true)} >
                                    Odobri
                                </button>
                                }
                                {(event.odobren!=="aktivan" && event.odobren!=="sakriven")&&
                                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]" onClick={() => setIsRejectVisable(true)}>
                                    Odbij
                                </button>
                                }
                                {(event.odobren==="zahtjev")&&
                                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]" onClick={() => setIsDeleteVisable(true)}>
                                    Obriši
                                </button>
                                }
                                {(event.odobren!=="zahtjev"&&event.odobren!=="sakriven"&&event.odobren!=="azuriran")&&
                                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]" onClick={() => setIsUkloniVisable(true)}>
                                    Sakrij
                                </button>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isEventPreviewVisable&&(
              <EventPreview
                isVisible={isEventPreviewVisable}
                closeDiv={()=>closePreview()}
                naslov={event.naziv}
                showIMG={`http://localhost:9000/dogadjaji/dogadjaj/${event.id}/slika`}
                lokacija={event.lokacija}
                datum={event.datum.split('-').reverse().join('.') + '.'}
                vrijeme={event.vrijeme.slice(0, 5)}
                opis={event.opis}
                tickets={event.karte} 
                marginTopValue={0}
                admin={true}
                id={event.id}
              />
            )}
            {isApproveVisable && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-80 flex flex-col items-center justify-center">
                    <div className="flex justify-between items-center gap-2 mb-10 ml-1 mr-1">
                        <h2 className="text-lg font-semibold">Potvrdi odobravanje dogadjaja</h2>
                        <button onClick={()=>setIsApproveVisable(false)} className="text-gray-500 hover:text-gray-800 text-2xl">
                        &times;
                        </button>
                    </div>
                        <span >Da li ste sigurni da</span><span> želite da odobrite dogadjaj?</span>
                        <button className=" w-[17rem] ml-2 mt-5 px-4 py-2 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms]" onClick={()=>setOdobren("aktivan")}>
                            Odobri
                        </button>
                    </div>
                </div>
            )}
            {isRejectVisable && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-80">
                    <div className="flex justify-between items-center mb-4 ml-2 mr-2">
                        <h2 className="text-lg font-semibold">Potvrdi odbijanje dogadjaja</h2>
                        <button onClick={()=>setIsRejectVisable(false)} className="text-gray-500 hover:text-gray-800 text-2xl">
                        &times;
                        </button>
                    </div>
                    <div className="mb-4 items-center justify-center flex flex-col">
                        <span >Da li ste sigurni da</span><span> želite da odbijete dogadjaj?</span>
                        <Input classname="mt-4" fieldType='textArea' size = '17rem' labelText = 'Razlog odbijanja dogadjaja*' defaultValue ="" helperText='' maxHh='18rem'></Input>
                    </div>
                        <button className=" w-[17rem] ml-2 px-4 py-2 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms]"  onClick={()=>setOdobren("odbijen")}>
                            Odbij
                        </button>
                    </div>
                </div>
            )}
            {isDeleteVisable && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-80">
                    <div className="flex justify-between items-center mb-4 ml-2 mr-2">
                        <h2 className="text-lg font-semibold">Potvrdi brisanje dogadjaja</h2>
                        <button onClick={()=>setIsDeleteVisable(false)} className="text-gray-500 hover:text-gray-800 text-2xl">
                        &times;
                        </button>
                    </div>
                    <div className="mb-4 items-center justify-center flex flex-col">
                        <span >Da li ste sigurni da</span><span> želite da obrišete dogadjaj?</span>
                        <Input classname="mt-4" fieldType='textArea' size = '17rem' labelText = 'Razlog brisanja dogadjaja' defaultValue ="" helperText='' maxHh='18rem'></Input>
                    </div>
                        <button className=" w-[17rem] ml-2 px-4 py-2 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms]" onClick={()=>deleteEvent()}>
                            Obriši
                        </button>
                    </div>
                </div>
            )}
            {isUkloniVisable && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-80">
                    <div className="flex justify-between items-center mb-4 ml-2 mr-2">
                        <h2 className="text-lg font-semibold">Potvrdi sakrivanje dogadjaja</h2>
                        <button onClick={()=>setIsUkloniVisable(false)} className="text-gray-500 hover:text-gray-800 text-2xl">
                        &times;
                        </button>
                    </div>
                    <div className="mb-4 items-center justify-center flex flex-col">
                        <span >Da li ste sigurni da</span><span> želite da sakrijete dogadjaj?</span>
                    </div>
                        <button className=" w-[17rem] ml-2 px-4 py-2 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms]" onClick={()=>setOdobren("sakriven")}>
                            Sakrij
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEventHandle;