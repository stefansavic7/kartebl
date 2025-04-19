import React, { useState } from 'react';
import Input from "./Input";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SendEmail = ({ emailPrimaoca }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [poruka, setPoruka] = useState("");

  const openDiv = () => setIsVisible(true);
  const closeDiv = () => {
    setIsVisible(false);
    setPoruka("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const decodedToken = jwtDecode(token);
      const emailPosiljaoca = decodedToken.sub;

      const porukaRequest = {
        emailPosiljaoca: emailPosiljaoca,
        emailPrimaoca: emailPrimaoca,
        sadrzajPoruke: poruka,
        procitana: false,
      };

      await axios.post("http://localhost:9000/poruke", porukaRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Poruka je uspješno poslata!");
      closeDiv();
    } catch (error) {
      console.error("Greška pri slanju poruke:", error);
      alert("Došlo je do greške prilikom slanja.");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-2xl z-40">
      <button
        className="flex flex-col justify-center items-center w-96 h-64 rounded-2xl bg-zinc-100 group transition transition-all hover:shadow-[0_0_0.9rem_0.6rem_rgba(236,72,153,0.8)] duration-300"
        onClick={openDiv}
      >
        <div className="relative flex justify-center items-center mt-10">
          <i className="fa-regular fa-envelope fa-7x absolute transition-opacity duration-[400ms] opacity-100 group-hover:opacity-0"></i>
          <i className="fa-solid fa-envelope fa-7x absolute transition-opacity duration-[400ms] opacity-0 group-hover:opacity-100"></i>
        </div>
        <span className="mt-14">Pošaljite nam poruku</span>
      </button>

      {isVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <div className="flex justify-between items-center mb-4 ml-2 mr-2">
              <h2 className="text-lg font-semibold">Pošaljite poruku</h2>
              <button onClick={closeDiv} className="text-gray-500 hover:text-gray-800 text-2xl">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  fieldType="textArea"
                  size="17rem"
                  labelText="Unesite Poruku *"
                  defaultValue=""
                  helperText=""
                  maxHh="26rem"
                  value={poruka}
                  onChange={(e) => {
                    setPoruka(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-[17rem] ml-2 px-4 py-2 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms]"
              >
                Pošalji
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendEmail;
