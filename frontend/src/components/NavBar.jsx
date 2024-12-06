import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar on resize if moving to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <div className="text-customBlue text-3xl font-bold italic">
            <Link to="/">Karte BL</Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 focus:outline-none"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            <Link to="/" className="flex items-center space-x-2 hover:text-gray-800">
              <i className="fa-solid fa-house"></i>
              <span>Početna</span>
            </Link>
            <Link to="/kontakt" className="flex items-center space-x-2 hover:text-gray-800">
              <i className="fas fa-phone"></i>
              <span>Kontaktirajte nas</span>
            </Link>
            <Link to="/karte" className="flex items-center space-x-2 hover:text-gray-800">
              <i className="fas fa-ticket"></i>
              <span>Karte</span>
            </Link>
            <Link to="/info" className="flex items-center space-x-2 hover:text-gray-800">
              <i className="fas fa-info"></i>
              <span>O nama</span>
            </Link>
          </div>

          {/* Login Button (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/prijava">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                <i className="fas fa-user"></i> Prijavi se
              </button>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 w-64 bg-white shadow-lg h-full z-40 transform transition-transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-600"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
          <ul className="mt-16 space-y-4">
            <li>
              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <i className="fa-solid fa-house"></i>
                <span>Početna</span>
              </Link>
            </li>
            <li>
              <Link
                to="/kontakt"
                onClick={closeSidebar}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-phone"></i>
                <span>Kontaktirajte nas</span>
              </Link>
            </li>
            <li>
              <Link
                to="/karte"
                onClick={closeSidebar}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-ticket"></i>
                <span>Karte</span>
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                onClick={closeSidebar}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-info"></i>
                <span>O nama</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
