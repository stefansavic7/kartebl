import React, { useState } from "react";
import Zdravko from "../assets/zdravko.jpeg";
import { FaEye,FaEyeSlash } from "react-icons/fa";


export const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      {/* Profile Info */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
        <img
          src={Zdravko}
          alt="Profilna slika"
          className="w-24 h-24 object-cover rounded-full border-4 border-gray-200"
        />

        <div className="ml-6">
          <p className="text-xl font-semibold text-gray-800">Zdravko Colic</p>
          <p className="text-gray-500">zdravko.colic@gmail.com</p>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ime:</label>
          <input
            type="text"
            value="Zdravko"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prezime:</label>
          <input
            type="text"
            value="Colic"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail:</label>
          <input
            type="text"
            value="zdravko.colic@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Lozinka:</label>
          <input
            type={showPassword ? "text" : "password"}
            value="moja_lozinka"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
      </div>
    </div>
  );
};
