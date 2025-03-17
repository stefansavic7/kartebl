import React, { useState, useEffect } from 'react';
import Input from "./Input";

const ChooseTickets = ({numberOfTickets}) => {


const [isVisible, setIsVisible] = useState(false);
    
  const openDiv = () => {
    setIsVisible(true);
  }
  const closeDiv = () => {
    setIsVisible(false);
    setGrandTotal(0);
    setTotals({});
  }

  const [totals, setTotals] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  const handleNumBoughtTicketsChange = (index, cijenaInput, e, numTicketInput) => {
    let value = Number(e.target.value);
  
    if (value > numTicketInput) value = numTicketInput;
    if (value < 0) value = 0;
  
    setTotals((prevTotals) => {
      const newTotals = { ...prevTotals, [index]: value * cijenaInput };
      return newTotals;
    });
  };
  
  useEffect(() => {
    const newGrandTotal = Object.values(totals).reduce((acc, curr) => acc + (curr || 0), 0);
    setGrandTotal(Math.max(parseFloat(newGrandTotal.toFixed(2)), 0));
  }, [totals]);
  

  return(
    <div>
        <button className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition w-[10rem] h-[3rem] mb-10 mt-5" onClick={openDiv}>
            Kupi kartu
        </button>
        {isVisible&&(
            <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#282231] text-white p-4 rounded shadow-lg w-90 flex flex-col items-center justify-center">
              <div className="flex justify-between items-center gap-16 mb-10 ml-2 mr-2">
                <h2 className="text-lg font-semibold">Odaberite broj i vrstu karata</h2>
                <button onClick={closeDiv} className="text-white hover:text-gray-400 text-2xl">
                  &times;
                </button>
              </div>
              {Array.from({ length: numberOfTickets }).map((_, index) => {
                    const karta = document.getElementsByName("Karta"+index)[0];
                    const cijenaInput = Number(document.getElementsByName("Cijena"+index)[0]?.value);
                    const numTicketInput = document.getElementsByName("NumTickets"+index)[0]?.value;

                    return (
                      <div key={index} className=" flex flex-col mb-5 rounded-2xl p-2 bg-white justify-center items-center w-[100%]">
                        <div className='flex flex-row justify-between items-center w-full'>
                          <span className="font-bold text-xl text-black ml-3 mb-2">{karta?.value}</span>
                          <Input name="NumBoughtTickets" fieldType="number" labelText="Količina" defaultValue={0} minValue={0} maxValue={numTicketInput} size="8rem" 
                            onChange={(e) =>
                              handleNumBoughtTicketsChange(index, cijenaInput, e, numTicketInput)
                            }>
                          </Input>
                        </div>
                      </div>
                    );
                  })}
              <div className="font-bold text-xl text-white ">
                <span>Ukupna cijena: {grandTotal} KM </span>     
              </div>
              <button className="mt-10 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms] w-full h-10">
                 Nastavi na plaćanje
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default ChooseTickets;
