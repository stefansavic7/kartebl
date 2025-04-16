import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'
import { useUser } from "../utils/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useUser();


  useEffect(() => {
    setIsDisabled(!(email && password));
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    try {
      const response = await axios.post("http://localhost:9000/login", {
        email,
        password,
      });
  
      const token = response.data;
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
        const decodedToken = jwtDecode(token);
  
       
        const userRole = decodedToken.role;
        const userEmail = decodedToken.sub;
  
        console.log("User Role:", userRole);
        console.log("User Email:", userEmail);
  
      
        setUser({
          email: userEmail,
          role: userRole,
          token: token,
        });
  
        
        navigate("/");
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/login.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 w-full max-w-3xl p-8 lg:p-16 space-y-8 rounded-lg shadow-lg text-white">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">Dobrodošli!</h1>
          <p className="text-lg lg:text-2xl mb-6">
            Pronađite i kupite karte za koncerte u Banjaluci — brzo, sigurno i
            jednostavno. Doživite muziku uživo na potpuno novi način!
          </p>
          <div className="w-16 h-1 bg-pink-500 mx-auto lg:mx-0"></div>
        </div>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg text-gray-800">
          <p className="text-2xl text-center text-gray-700 mb-6">Prijava</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email adresa
              </label>
              <TextField
                id="email"
                type="email"
                placeholder="Unesite email adresu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Lozinka
              </label>
              <TextField
                id="password"
                type="password"
                placeholder="Unesite lozinku"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className={`w-full py-2 px-4 rounded ${isDisabled ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-pink-500 text-white hover:bg-pink-600"}`}
              disabled={isDisabled}
            >
              Prijavi se
            </Button>

            <p className="text-sm text-center mt-4">
              Zaboravio si lozinku?{" "}
              <a href="#" className="text-pink-500 hover:underline">
                Resetuj lozinku
              </a>
            </p>

            <Button
              type="button"
              className="w-full bg-white border border-gray-300 text-black flex items-center justify-center py-2 px-4 rounded hover:bg-gray-100"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Prijavi se pomoću Google naloga
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Nemaš nalog?{" "}
            <Link to="/registracija" className="text-pink-500 hover:underline">
              Registruj se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
