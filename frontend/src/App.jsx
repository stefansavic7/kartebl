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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="karte" element={<Tickets />} />
          <Route path="info" element={<About />} />
          <Route path="*" element={<div>ERROR 404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
