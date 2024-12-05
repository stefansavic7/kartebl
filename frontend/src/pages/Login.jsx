import { useState } from 'react';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="flex min-h-screen bg-gray-200 shadow-gray-900 shadow-md">
      {/* Leva strana */}
      <div className="hidden lg:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/assets/login.jpg')" }}>
        <div className="bg-black bg-opacity-50 flex flex-col justify-center p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Dobrodošli!</h1>
          <p className="text-2xl mb-6">
          Pronađite i kupite karte za koncerte u Banjaluci — brzo, sigurno i jednostavno. Doživite muziku uživo na potpuno novi način!
          </p>
          <div className="w-56 h-1 bg-pink-500"></div>
        </div>
      </div>

      {/* Desna strana */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-white">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">Prijava</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField 
              type="email" 
              placeholder="Unesite email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full"
            />
            <TextField 
              type="password" 
              placeholder="Unesite lozinku" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full"
            />
            <div className="text-right text-sm">
              <a href="#" className="text-blue-500 hover:underline">Zaboravili ste lozinku?</a>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Prijava
            </Button>
            <Button 
              type="button" 
              className="w-full bg-white border border-gray-300 text-black flex items-center justify-center py-2 px-4 rounded hover:bg-gray-100"
            >
                {/* <FaGoogle /> */}
                <FcGoogle className="w-5 h-5 mr-2" />
              Nastavi uz Google
            </Button>
          </form>
          <p className="text-sm text-center">
            Nemaš nalog?{' '}
            <a href="#" className="text-pink-500 hover:underline">Napravi nalog</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;