
import Footer from "../components/Footer";
import { useState,useEffect } from "react";
import axios from "axios";

const EventPreview = ({ isVisible,closeDiv,naslov,showIMG,lokacija,datum,vrijeme,opis,tickets,marginTopValue=0, admin=false, id=null}) =>{
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if(admin){
          const response = await axios.get(`http://localhost:9000/dogadjaji/${id}`);
          setEvent(response.data);
        }
      } catch (error) {
          alert("An error occurred while fetching event: "+error);
      }
    };
    fetchEvent();
  }, [id]); 

  if (!event && admin) {
    return <div>Loading event...</div>;
  }
  
  return(
        <div >
            {isVisible && (
              <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 mt-${marginTopValue}`}>
                <div className=" w-full h-full bg-white shadow-lg overflow-y-auto z-30 flex flex-col items-center justify-start">
                  <button  onClick={closeDiv} className="text-gray-500 hover:text-gray-800 text-2xl z-50 ml-[90rem] text-3xl mt-5">
                    <b>&times;</b>
                  </button>
                  <span  className="z-50 text-3xl"><b>{naslov}</b></span>
                  
                  {showIMG && <img src={showIMG} alt="Slika" className="rounded shadow-lg w-[70%] h-auto my-10"/>}
                  <div className="flex flex-row text-2xl justify-between space-x-[38rem] font-bold">
                    <div className="flex pl-3 gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="size-6"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282a1.144 0.742Z" clip-rule="evenodd"/></svg>
                      <div>{lokacija}</div>
                    </div>
                    <div className="flex pr-3 pb-10 gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="size-6 mt-1"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd"/></svg>
                      <div>{datum}</div> u 
                      <div>{vrijeme}h</div>
                    </div>
                  </div>
                  <div className="w-[65rem]  whitespace-pre-wrap">
                    {opis}
                  </div>
                  
                  <div className="flex flex-col justify-center items-center bg-zinc-200 rounded-2xl px-10 my-5">
                    <span className="text-2xl font-bold mb-5">Karte</span>
                    {!admin && Array.from({ length: tickets }).map((_, index) => {
                    const karta = document.getElementsByName("Karta"+index)[0];
                    const cijenaInput = document.getElementsByName("Cijena"+index)[0];

                    return (
                      <div key={index} className=" flex flex-col mb-5 rounded-2xl p-2 justify-center items-center bg-[#282231] text-white">
                        <span className="font-bold text-xl ">{karta?.value}</span>
                        <div className="bg-white rounded-xl text-black m-2 p-2">
                          <div><b>Cijena:</b> {cijenaInput?.value} KM</div>
                        </div>
                      </div>
                    );
                  })}
                  {
                  admin&&(Array.from({ length: event.karte.length }).map((_, index) => {
                    const karta = event.karte[index].vrstaKarte;
                    const cijenaInput = event.karte[index].cijena;
                    const numTickets = event.karte[index].maxBrojKarata;
                    return (
                        <div key={index} className=" flex flex-col mb-5 rounded-2xl p-2 justify-center items-center bg-[#282231] text-white">
                        <span className="font-bold text-xl ">{karta}</span>
                        <div className="bg-white rounded-xl text-black m-2 p-2">
                            <div><b>Cijena:</b> {cijenaInput} KM</div>
                            <div><b>Broj karata:</b> {numTickets}</div>
                        </div>
                        </div>
                    );
                    }))}
                  </div>
                  <Footer></Footer>
                </div>
              </div>
            )}
        </div>
    );
};

export default EventPreview;