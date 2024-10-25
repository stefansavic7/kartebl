// import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-customBlue text-3xl font-bold italic ml-4">
          Karte BL
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6 text-gray-600">
          <a href="#" className="flex items-center space-x-2 hover:text-gray-800">
            <i className="fas fa-phone"></i>
            <span>Kontaktirajte nas</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-gray-800">
            <i className="fas fa-ticket-alt"></i>
            <span>Karte</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-gray-800">
            <i className="fas fa-info"></i>
            <span>O nama</span>
          </a>
        </div>

        {/* Language Selector and Login */}
        <div className="flex items-center space-x-4">

          {/* Login Button */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition mr-10">
            <i className="fas fa-user"></i> Prijavi se
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
