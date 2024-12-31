import { Link } from 'react-router-dom';
import ticketImageRight from '../assets/ticketr.png';
import ticketImageLeft from '../assets/ticketl.png';

const Footer = () => {
  return (
    <div className="bg-[#282231] text-white">
      {/* Kontejner za slike i sadržaj */}
      <div className="flex flex-wrap items-center justify-between container mx-auto pt-6 px-4 lg:px-12">
        {/* Leva slika */}
        <img
          className="h-[15%] w-[15%] mb-6 lg:mb-0"
          src={ticketImageLeft}
          alt="Leva karta"
        />

        {/* Informacije */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-24 text-center sm:text-left">
          {/* Opšte informacije */}
          <div>
            <span className="text-xl font-bold mb-3 block">
              Opšte informacije
            </span>
            <Link to="/" className="text-gray-300 hover:text-pink-500 transition duration-300 block">
              Početna stranica
            </Link>
            <Link to="/info" className="text-gray-300 hover:text-pink-500 transition duration-300 block">
              O nama
            </Link>
          </div>

          {/* Pomoć */}
          <div>
            <span className="text-xl font-bold mb-3 block">Pomoć</span>
            <Link to="/kontakt" className="text-gray-300 hover:text-pink-500 transition duration-300 block">
              Često postavljena pitanja
            </Link>
          </div>

          {/* Pronađite nas */}
          <div>
            <span className="text-xl font-bold mb-3 block">Pronađite nas</span>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center sm:justify-start items-center text-gray-300 hover:text-pink-500 transition duration-300 mb-2"
            >
              <svg
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <g
                  fill="currentColor"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(4,4)">
                    <path d="M21.58008,7c-8.039,0 -14.58008,6.54494 -14.58008,14.58594v20.83203c0,8.04 6.54494,14.58203 14.58594,14.58203h20.83203c8.04,0 14.58203,-6.54494 14.58203,-14.58594v-20.83398c0,-8.039 -6.54494,-14.58008 -14.58594,-14.58008zM47,15c1.104,0 2,0.896 2,2c0,1.104 -0.896,2 -2,2c-1.104,0 -2,-0.896 -2,-2c0,-1.104 0.896,-2 2,-2zM32,19c7.17,0 13,5.83 13,13c0,7.17 -5.831,13 -13,13c-7.17,0 -13,-5.831 -13,-13c0,-7.169 5.83,-13 13,-13zM32,23c-4.971,0 -9,4.029 -9,9c0,4.971 4.029,9 9,9c4.971,0 9,-4.029 9,-9c0,-4.971 -4.029,-9 -9,-9z"></path>
                  </g>
                </g>
              </svg>
              Instagram
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center sm:justify-start items-center text-gray-300 hover:text-pink-500 transition duration-300"
            >
              <svg
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <g
                  fill="currentColor"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(4,4)">
                    <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM37,19h-2c-2.14,0 -3,0.5 -3,2v3h5l-1,5h-4v15h-5v-15h-4v-5h4v-3c0,-4 2,-7 6,-7c2.9,0 4,1 4,1z"></path>
                  </g>
                </g>
              </svg>
              Facebook
            </a>
          </div>
        </div>

        {/* Desna slika */}
        <img
          className="h-[15%] w-[15%] mt-6 lg:mt-0"
          src={ticketImageRight}
          alt="Desna karta"
        />
      </div>
    </div>
  );
};

export default Footer;
