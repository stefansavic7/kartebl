import { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/login.jpg')",
      }}
    >
      {/* Overlay za tekst i formu */}
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
          <p className="text-2xl text-center text-gray-700 mb-6">
            Registracija
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email polje */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email adresa
                  </label>
                  <TextField
                    id="email"
                    type="email"
                    placeholder="Odaberite email adresu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Password polje */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lozinka
                  </label>
                  <TextField
                    id="password"
                    type="password"
                    placeholder="Odaberite lozinku"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                  <TextField
                    id="password"
                    type="password"
                    placeholder="Potvrdite lozinku"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Submit dugme */}
                <Button
                  type="submit"
                  className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed"
                  disabled
                >
                  Registruj se
                </Button>
             
                {/* Google dugme */}
                <Button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-black flex items-center justify-center py-2 px-4 rounded hover:bg-gray-100"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Registruj se pomoću Google naloga
                </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Imaš nalog?{" "}
            <Link to="/prijava">
            <a href="#" className="text-pink-500 hover:underline">
              Prijavi se
            </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;