import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const isFormValid =
      ime.trim() !== "" &&
      prezime.trim() !== "" &&
      korisnickoIme.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      passwordConfirm.trim() !== "" &&
      password === passwordConfirm;

    setIsDisabled(!isFormValid);
  }, [ime, prezime, korisnickoIme, email, password, passwordConfirm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Lozinke se ne poklapaju.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/register", {
        ime,
        prezime,
        korisnickoIme,
        email,
        password,
        tip: "korisnik",
      });

      console.log("Registracija uspješna:", response.data);
      alert("Registracija uspješna!");
      navigate("/prijava");
    } catch (error) {
      console.error("Greška pri registraciji:", error.response?.data || error.message);
      alert("Došlo je do greške pri registraciji.");
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
            Pronađite i kupite karte za koncerte u Banjaluci — brzo, sigurno i jednostavno.
          </p>
          <div className="w-16 h-1 bg-pink-500 mx-auto lg:mx-0"></div>
        </div>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg text-gray-800">
          <p className="text-2xl text-center text-gray-700 mb-6">Registracija</p>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Ime i Prezime */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ime" className="block text-sm font-medium text-gray-700">
                  Ime
                </label>
                <TextField
                  id="ime"
                  type="text"
                  placeholder="Unesite ime"
                  value={ime}
                  onChange={(e) => setIme(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="prezime" className="block text-sm font-medium text-gray-700">
                  Prezime
                </label>
                <TextField
                  id="prezime"
                  type="text"
                  placeholder="Unesite prezime"
                  value={prezime}
                  onChange={(e) => setPrezime(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Korisničko ime */}
            <div>
              <label htmlFor="korisnickoIme" className="block text-sm font-medium text-gray-700">
                Korisničko ime
              </label>
              <TextField
                id="korisnickoIme"
                type="text"
                placeholder="Odaberite korisničko ime"
                value={korisnickoIme}
                onChange={(e) => setKorisnickoIme(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Email */}
            <div>
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

            {/* Lozinka i potvrda */}
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
              <TextField
                id="passwordConfirm"
                type="password"
                placeholder="Potvrdite lozinku"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Registracija dugme */}
            <Button
              type="submit"
              className={`w-full py-2 px-4 rounded ${
                isDisabled
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
              disabled={isDisabled}
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
            <Link to="/prijava" className="text-pink-500 hover:underline">
              Prijavi se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
