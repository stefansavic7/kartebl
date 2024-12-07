import React from "react";
import Zdravko from "../assets/zdravko.jpeg";
import TextField from "../components/TextField"

export const MyProfile = () => {
  return (
   <div className="w-full h-full bg-white ">
        <div className="flex">
            <img src={Zdravko}
            alt="Profilna slika"
            className="w-24 h-24 object-cover rounded-full border-4 border-gray-200 m-4"
            />
            
            <div className="ml-4 mt-8">
                <p className="text-lg font-semibold">Zdravko Colic</p>
                <p className="">zdravko.colic@gmail.com</p>
            </div>
        </div>
        <div>
            <label className="">Ime:</label><br />
            <input type="text" value="Zdravko" className="border " /> //ovde stao.
        </div>
   </div>
  );
};
