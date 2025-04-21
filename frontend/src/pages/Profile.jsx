import React, { useEffect, useState } from "react";
import { MyProfile } from "../components/MyProfile.jsx";
import { Orders } from "../components/Orders.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [korisnik, setKorisnik] = useState(null);

  useEffect(() => {
    const fetchKorisnik = async() => {
      try{
        const tokenString = localStorage.getItem("token"); 
        const token=JSON.parse(tokenString);
        const decodeToken=jwtDecode(token);
        
        const email=decodeToken.sub;
        
        const response = await axios.get(`http://localhost:9000/korisnici/email/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setKorisnik(response.data);


      }catch(error){
        console.error("Greška pri dohvatanju korisnika:", error);
      }

    };

    fetchKorisnik();
  }, []);



  const divContents = [
    <div className="p-5 w-full h-full">
      <MyProfile></MyProfile>
    </div>,
    <div className="bg-zinc-100 w-[68rem] h-[37rem] rounded-2xl ml-5 mt-5 mb-5 overflow-y-auto">
    <Orders></Orders>
  </div>,
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Podešavanja</h2>
      <p className="text-gray-600">Promijenite svoje postavke ovdje.</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Spremi promjene
      </button>
    </div>,
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pomoć</h2>
      <p className="text-gray-600">Ako trebate pomoć, kontaktirajte nas na <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a>.</p>
    </div>,
  ];

  return (
    <div className="bg-zinc-200 flex">
      <div className="mt-5 ml-5 mb-5">
        <div className="p-10 bg-zinc-100 w-96 rounded-tl-2xl rounded-tr-2xl">
          <div className="text-2xl pt-8 pb-8">
          <b>{korisnik ? `${korisnik.ime} ${korisnik.prezime}` : "Učitavanje..."}</b>
          </div>
        </div>
        <div className="mt-0.5 p-9 bg-zinc-100 w-96 h-[25.8rem] rounded-bl-2xl rounded-br-2xl">
          {["Moj Profil", "Narudžbe"].map((label, index) => (
            <div key={index}>
              <button
                className={` text-xl flex items-center gap-1 pt-10 hover:text-pink-500 transition ${activeIndex === index ? "opacity-40" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d={
                      index === 0
                        ? "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        : "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        
                    }/>
                </svg>
                {label}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-100 w-[68rem] h-[37rem] rounded-2xl ml-5 mt-5 mb-5">{divContents[activeIndex]}</div>
    </div>
  );
};

export default Profile;



