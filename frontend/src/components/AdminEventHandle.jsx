import { useState } from "react";
import Event from "./Event";
import EventPreview from "./EventPreview";

const AdminEventHandle = ({ isVisible, setIsVisible , event}) =>{

    const[isEventPreviewVisable,setIsEventPreviewVisable]=useState(false);
    
    const openPreview = () => {
        document.documentElement.classList.add("overflow-hidden");
        setIsEventPreviewVisable(true);
      }
      const closePreview = () => {
        document.documentElement.classList.remove("overflow-hidden");
        setIsEventPreviewVisable(false);
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
                                    Picture={event.image}
                                    Title={event.name}
                                    Location={event.location}
                                    Date={event.date.split('-').reverse().join('.') + '.' + " u " + event.time.slice(0, 5) + "h"}>
                                 </Event>
                            </div>
                            <div className="flex flex-row justify-between items-center gap-8">
                                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]" onClick={() => openPreview()}>
                                    Pregledaj
                                </button>
                                <button className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]" >
                                    Odobri
                                </button>
                                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]">
                                    Odbij
                                </button>
                                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]">
                                    Obriši
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isEventPreviewVisable&&(
              <EventPreview
                isVisible={isEventPreviewVisable}
                closeDiv={()=>closePreview()}
                naslov={event.name}
                showIMG={event.image}
                lokacija={event.location}
                datum={event.date.split('-').reverse().join('.') + '.'}
                vrijeme={event.time.slice(0, 5)}
                opis={event.description}
                numberOfTickets={0}
                marginTopValue={14}
              />
            )}
        </div>
    );
};

export default AdminEventHandle;