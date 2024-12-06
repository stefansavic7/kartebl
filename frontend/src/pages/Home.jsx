//import Input from "../components/Input";
import Event from "../components/Event";
import Zdravko from "../assets/zdravko.jpeg";
import Prijovicka from "../assets/prijovicka.jpg";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center items-center">
    {/*<Input fieldType="password"  labelText="Password"></Input>
     <Input fieldType='outlined-required' size='30rem' labelText = 'Name' defaultValue ="Marko"  ></Input>
    <Input fieldType='outlined-disabled'  ></Input>
    <Input fieldType='number'  ></Input>
    <Input fieldType='helperText' labelText = 'Name' helperText='Enter your name' ></Input>*/}
    <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
    <Event Picture={Prijovicka} Title="Koncert Aleksandre Prijovic" Location="Akvana" Date="30.11.2025."></Event>
    <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
    <Event Picture={Zdravko} Title="Koncert Zdravka Colica" Location="Tvrdjava Kastel" Date="20.05.2025."></Event>
    <Event Picture={Prijovicka} Title="Koncert Aleksandre Prijovic" Location="Akvana" Date="30.11.2025."></Event>
    </div>
  )
}

export default Home