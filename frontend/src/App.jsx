// import NavBar from "./components/NavBar";
// import SendEmail from "./components/SendEmail";
// import CallUs from "./components/CallUs";
//import BasicInput from "./components/BasicInput";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Tickets from "./pages/Tickets";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import axios from 'axios'
import { useEffect, useState } from "react";


const App = () => {


  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:9000/dogadjaji").then((res)=>{
      setData(res.data)
    })
  }, [])

  useEffect(()=>{
    console.log(data);
    
  }, [data])

  data.forEach(item=>{
    console.log(item.naziv)
  })


  // const data = fetch("http://localhost:9000/dogadjaji")
  // .then((res)=>res.json)
  // .then((data)=>data)
  // console.log(data)


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="karte" element={<Tickets />} />
          <Route path="info" element={<About />} />
          <Route path="profil" element={<Profile />} />
          <Route path="*" element={<div>ERROR 404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
