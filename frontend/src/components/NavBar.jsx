import { Link } from 'react-router-dom';
import { useUser } from "../utils/UserContext";  
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate()
  const { user, logout } = useUser();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        
        <div className="text-customBlue text-3xl font-bold italic">
          <Link to="/">Karte BL</Link>
        </div>

       
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-800">
            <i className="fa-solid fa-house"></i>
            <span>Početna</span>
          </Link>
          <Link to="/kontakt" className="flex items-center space-x-2 hover:text-gray-800">
            <i className="fas fa-phone"></i>
            <span>Kontaktirajte nas</span>
          </Link>
          <Link to="/info" className="flex items-center space-x-2 hover:text-gray-800">
            <i className="fas fa-info"></i>
            <span>O nama</span>
          </Link>
          {user && 
          <Link to="/pregledPoruka" className="flex items-center space-x-2 hover:text-gray-800">
          <i className="fas fa-envelope"></i>
            <span>Pregledaj poruke</span>
          </Link>
          }
          {
            user && user.role === "administrator" &&
          <Link to="/eventList" className="flex items-center space-x-2 hover:text-gray-800">
          <i className="fas fa-calendar"></i>
            <span>Pregledaj događaje</span>
          </Link>
          }
        </div>

        
        <div className="hidden md:flex items-center space-x-4">
         
          {user ? (
            <>
             
              <Link to="/profil">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                  <i className="fas fa-user"></i> Profil
                </button>
              </Link>

              
              <button
                onClick={()=>{
                  logout()
                  navigate("/prijava")          
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Odjavi se
              </button>
            </>
          ) : (
            <Link to="/prijava">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                <i className="fas fa-user"></i> Prijavi se
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
