import Input from "../components/Input"; 
import React, { useState } from "react";

function TicketForm() {
  const [numberOfTickets, setNumberOfTickets] = React.useState(1);

  const handleNumberOfTicketsChange = (e) => {
    const value =Math.max(1,Number(e.target.value)) ;
    setNumberOfTickets(value);
  };

  return (
       
    <div className="flex flex-col items-center justify-center m-10">
      <Input id= "numTickets"fieldType="number" labelText="Unesite broj vrsta karata" defaultValue={numberOfTickets}
        onChange={(e) => {
          handleNumberOfTicketsChange(e);
          console.log("guraj");
          e.target.onChange(e);
        }}/>
      <div className="bg-zinc-200 space-y-4 rounded-2xl p-10 ">
        {Array.from({ length: numberOfTickets }).map((_, index) => (
          <div key={index} className="flex bg-white rounded-2xl p-5">
            <Input fieldType="outlined-required" labelText="Naziv karte" />
            <Input fieldType="number" labelText="Cijena karte u KM" minValue={0} />
            <Input fieldType="number" labelText="Broj karata" minValue={0} />
          </div>
        ))}
      </div>
    </div>
  );
}

const CreateEvent = ()=>{
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
  
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        if (e.target.files[0]) {
          setMessage("");
        }
      };
  
    const handleUpload = async () => {
      if (!file) {
        setMessage("Molimo izaberite sliku");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
        setMessage(result.message);
      } catch (error) {
        console.error(error);
        setMessage("Otpremanje neuspješno");
      }};
      
      
    return(
        <div className="flex flex-col items-center justify-center m-10">
            <Input fieldType='outlined-required' labelText = 'Naslov dogadjaja'></Input>
            <div className="flex flex-col items-center justify-center bg-zinc-200 rounded-2xl p-10 w-[20rem] h-[14rem]">
                <input type="file" id="fileInput" onChange={handleFileChange} className="hidden"/>
                <label htmlFor="fileInput" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer">
                    {file ? "Promijenite sliku" : "Izaberite sliku"}
                </label>
                <p className="m-5">
                    {file ?  `${file.name}` : ""}
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition" onClick={handleUpload}>
                    Otpremi
                </button>
                {message && <p>{message}</p>}
            </div>
            <Input fieldType='textArea' size = '80rem'rows = {10} labelText = 'Unesite opis događaja*' defaultValue ="" helperText='' maxHh='100rem'></Input>
            <TicketForm></TicketForm>
            <div className="flex gap-10">
                <button className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]">
                    Pregledaj
                </button>
                <button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-[8.5rem] h-[3rem]">
                    Pošalji zahtjev za objavu
                </button>
            </div>
        </div>

    );

}

export default CreateEvent;