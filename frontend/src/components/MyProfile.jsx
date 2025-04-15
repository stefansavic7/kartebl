import React, { useState,useEffect } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


export const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const openDiv = () => setIsVisible(true);
  const closeDiv = () => setIsVisible(false);

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

        //ovde stao. treba mi endpoint koji vraca sifru korisnika. 
        setKorisnik(response.data);
       

      }catch(error){
        console.error("Greška pri dohvatanju korisnika:", error);
      }

    };

    fetchKorisnik();
  }, []);

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      {/* Profile Info */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
        <div className="ml-2">
          <p className="text-xl font-semibold text-gray-800"> {korisnik ? `${korisnik.ime} ${korisnik.prezime}` : null}</p>
          <p className="text-gray-500">{korisnik ? korisnik.email : null}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ime:</label>
          
          <input
          type="text"
          value={korisnik ? korisnik.ime : ""}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 cursor-default focus:outline-none"
    />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prezime:</label>
          <input
            type="text"
            value={korisnik ? korisnik.prezime : ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 cursor-default focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail:</label>
          <input
            type="text"
            value={korisnik ? korisnik.email : ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 cursor-default focus:outline-none"          />
        </div>

      
      {/*
    <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Lozinka:</label>
          <input
            type={showPassword ? "text" : "password"}
            value="moja_lozinka"
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 cursor-default focus:outline-none"          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-3 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <FaEye/>
            ) : (
              <FaEyeSlash/>
            )}
          </button>
        </div>
      
      
      */}
      
        <button className="col-span-2 flex text-red-500 mt-40 justify-end " onClick={openDiv}>
          Obriši nalog
        </button>
        {isVisible && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-80 flex flex-col items-center justify-center">
              <div className="flex justify-between items-center gap-16 mb-10 ml-2 mr-2">
                <h2 className="text-lg font-semibold">Potvrdi brisanje naloga</h2>
                <button onClick={closeDiv} className="text-gray-500 hover:text-gray-800 text-2xl">
                  &times;
                </button>
              </div>
                <span >Da li ste sigurni da</span><span> želite da obrišete nalog?</span>
              <button className="text-red-500 mt-10 ">
                Obriši nalog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
