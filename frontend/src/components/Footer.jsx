import { Link } from 'react-router-dom';
import ticketImageRight from '../assets/ticketr.png';
import ticketImageLeft from '../assets/ticketl.png';

const Footer = () => {
  return (
    <div className="flex item-center justify-center bg-[#282231] text-white">
      <img className="h-[15%] w-[15%]"src={ticketImageLeft}/>
      <div className="p-5 flex flex-col mr-40">
        <span className=' text-xl mb-3'><b>Opšte informacije</b></span>
        <Link to="/">
          <span className='text-gray-300 hover:text-pink-500 transition-color duration-300'>Početna stranica</span>
        </Link>
        <Link to="/info">
          <span className='text-gray-300 hover:text-pink-500 transition-color duration-300'>O nama</span>
        </Link>
      </div>
      <div className="p-5 flex flex-col">
        <span className=' text-xl  mb-3'><b>Pomoć</b></span>
        <Link to="/kontakt">
          <span className='text-gray-300 hover:text-pink-500 transition-color duration-300'>Često postavljena pitanja</span>
        </Link>
      </div>
      <div className="p-5 flex flex-col ml-40">
        <span className=' text-xl  mb-3'><b>Pronađite nas</b></span>
        <a href="#" target="_blank" rel="noopener noreferrer" className='flex text-gray-300 hover:text-pink-500 transition-color duration-300'>
          <svg className="mr-1" xmlns="http://www.w3.org/2000/svg"x="0px"y="0px"width="30"height="30"viewBox="0 0 256 256"><g fill="currentColor" fillRule="nonzero"stroke="none"strokeWidth="1"strokeLinecap="butt" strokeLinejoin="miter"strokeMiterlimit="10"fontFamily="none"fontWeight="none"fontSize="none"textAnchor="none"style={{ mixBlendMode: "normal" }}><g transform="scale(4,4)"><path d="M21.58008,7c-8.039,0 -14.58008,6.54494 -14.58008,14.58594v20.83203c0,8.04 6.54494,14.58203 14.58594,14.58203h20.83203c8.04,0 14.58203,-6.54494 14.58203,-14.58594v-20.83398c0,-8.039 -6.54494,-14.58008 -14.58594,-14.58008zM47,15c1.104,0 2,0.896 2,2c0,1.104 -0.896,2 -2,2c-1.104,0 -2,-0.896 -2,-2c0,-1.104 0.896,-2 2,-2zM32,19c7.17,0 13,5.83 13,13c0,7.17 -5.831,13 -13,13c-7.17,0 -13,-5.831 -13,-13c0,-7.169 5.83,-13 13,-13zM32,23c-4.971,0 -9,4.029 -9,9c0,4.971 4.029,9 9,9c4.971,0 9,-4.029 9,-9c0,-4.971 -4.029,-9 -9,-9z"></path></g></g></svg>
          <span className='gap-5'>Instagram</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className='flex text-gray-300 hover:text-pink-500 transition-color duration-300'>
          <svg className="ml-0.5"xmlns="http://www.w3.org/2000/svg"x="0px"y="0px"width="32"height="32"viewBox="0 0 256 256"><g fill="currentColor" fillRule="nonzero"stroke="none"strokeWidth="1"strokeLinecap="butt"strokeLinejoin="miter"strokeMiterlimit="10"fontFamily="none"fontWeight="none"fontSize="none"textAnchor="none"style={{ mixBlendMode: "normal" }}><g transform="scale(4,4)"><path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM37,19h-2c-2.14,0 -3,0.5 -3,2v3h5l-1,5h-4v15h-5v-15h-4v-5h4v-3c0,-4 2,-7 6,-7c2.9,0 4,1 4,1z"></path></g></g></svg>
          <span>Facebook</span>
        </a>
      </div>
      <img className="h-[15%] w-[15%]"src={ticketImageRight}/>

    </div>
  )
}

export default Footer