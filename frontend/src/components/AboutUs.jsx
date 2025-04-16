import { Link } from "react-router-dom";
import Zdravko from "../assets/zdravko.jpeg";
import OnlineProdaja from "../assets/OnlineProdaja.jpg";

export const AboutUs = () => {
    return (
      <div className="flex flex-col md:flex-row bg-gray-100 p-6 md:p-12 min-h-screen">
        {/* Tekstualni sadržaj */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">O NAMA</h2>
          <p className="text-gray-600 font-semibold mb-4">
            
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
          Mi smo kompanija koja se bavi prodajom karata putem interneta. Naš cilj je da korisnicima omogućimo brz, jednostavan i siguran način za kupovinu karata za razne događaje – od koncerata i sportskih manifestacija do pozorišnih predstava i festivala.

Naš tim čine entuzijastični i iskusni profesionalci posvećeni pružanju vrhunske usluge. Stalno radimo na unapredjenju naše platforme kako bismo korisnicima omogućili što bolje iskustvo.

Bez obzira gdje se nalazite, uz par klikova možete rezervisati svoje mesto na omiljenom događaju. Vaše zadovoljstvo nam je na prvom mjestu!
          </p>
          
          

  <div className="flex justify-center mt-6">
  <Link
    to="/kontakt"
    className="bg-gray-800 text-white py-2 px-6 hover:bg-gray-700 transition">
    Kontaktirajte nas
  </Link>
  </div>

          {/* Ikonice društvenih mreža */}
          <div className="flex mt-6 space-x-4">
            <a href="#" className="text-red-600 text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-red-600 text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-red-600 text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Slika */}
        <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <img  
            src={OnlineProdaja}
            alt="About Us"
            className="rounded shadow-lg max-w-md w-full h-auto"
          />
        </div>
      </div>
    );
};
