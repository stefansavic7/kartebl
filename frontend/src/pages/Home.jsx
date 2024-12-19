import Input from "../components/Input"; 
import Event from "../components/Event";
import Zdravko from "../assets/zdravko.jpeg";
import RibljaCorba from "../assets/RibljaCorba.jpg";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center items-center">
    <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
    <Event Picture={RibljaCorba} Title="Koncert Riblje Corbe" Location="Akvana" Date="30.11.2025."></Event>
    <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
    <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
    <Event Picture={RibljaCorba} Title="Koncert Riblje Corbe" Location="Akvana" Date="30.11.2025."></Event>
    </div>
  )
}

export default Home