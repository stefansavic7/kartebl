import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Input from "./Input";

const ChooseTickets = ({ tickets }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [totals, setTotals] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [check, setCheck] = useState(false);
  const [loading, setLoading]=useState(false);

  const openDiv = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      alert("Morate imati nalog da bi kupili kartu.");
      return;
    }
    setIsVisible(true);
  }
  const closeDiv = () => {
    setIsVisible(false);
    setGrandTotal(0);
    setTotals({});
    setQuantities({});
  }

  const handleNumBoughtTicketsChange = (index, cijenaInput, e, numTicketInput) => {
    let value = Number(e.target.value);
    if (value > numTicketInput) value = numTicketInput;
    if (value < 0) value = 0;
    setTotals(prev => ({ ...prev, [index]: value * cijenaInput }));
    setQuantities(prev => ({ ...prev, [index]: value }));
  };

  useEffect(() => {
    const total = Object.values(totals).reduce((acc, curr) => acc + (curr || 0), 0);
    setGrandTotal(Math.max(parseFloat(total.toFixed(2)), 0));
  }, [totals]);

  const buyTickets = async () => {
    if (Object.values(quantities).every(q => q === 0 || q === undefined)) {
      alert("Odaberite barem jednu kartu.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("token"));
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    setLoading(true);

    const userResp = await fetch(`http://localhost:9000/korisnici/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!userResp.ok) {
      alert("Failed getting user ID");
      return;
    }
    const userData = await userResp.json();
    const userId = userData.id;

    try {
      for (const [idx, qty] of Object.entries(quantities)) {
        if (qty > 0) {
          const ticket = tickets[idx];
          for(let i=0;i<qty;i++){
            const transakcija = {
              korisnikId: userId,
              kartaId: ticket.id,
            };
            const resp = await fetch("http://localhost:9000/transakcije/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(transakcija)
            });
            if (!resp.ok) {
              alert(`Kupovina nije uspjela.`);
            }
          }
        }
      }
      setLoading(false);
      alert("Kupovina uspješna!");
      setQuantities({});
      setTotals({});
      setGrandTotal(0);
      setCheck(false);
      setIsVisible(false);
      window.location.reload();

      Array.from(document.getElementsByName("NumBoughtTickets")).forEach(input => input.value = 0);
    } catch (err) {
      alert("An error occurred while buying tickets: " + err);
    }
  }

  return (
    <div>
      {!loading&&(
      <div>
      <button className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition w-[10rem] h-[3rem] mb-10 mt-5" onClick={openDiv}>
        Kupi kartu
      </button>

      {isVisible && (
        <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#282231] text-white p-4 rounded shadow-lg w-96 flex flex-col items-center justify-center">
            <div className="flex justify-between items-center gap-16 mb-10 ml-2 mr-2">
              <h2 className="text-lg font-semibold">Odaberite broj i vrstu karata</h2>
              <button onClick={closeDiv} className="text-white hover:text-gray-400 text-2xl">&times;</button>
            </div>
            <div className={`max-h-[14rem] overflow-y-auto ${tickets.length > 2 ? 'pr-4' : ''}`}>  
              {tickets.map((item, index) => {
                const { vrstaKarte, cijena, maxBrojKarata, brojProdatihKarata } = item;
                const available = Number(maxBrojKarata) - Number(brojProdatihKarata);
                return (
                  available > 0 && (
                    <div key={index} className="flex flex-col mb-5 rounded-2xl p-2 bg-white justify-center items-center w-full">
                      <div className='flex flex-row justify-between items-center w-full'>
                        <span className="font-bold text-xl text-black ml-3 mb-2">{vrstaKarte}</span>
                        <Input
                          name="NumBoughtTickets"
                          fieldType="number"
                          labelText="Količina"
                          defaultValue={0}
                          minValue={0}
                          maxValue={available}
                          size="8rem"
                          onChange={e => handleNumBoughtTicketsChange(index, cijena, e, available)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
            <div className="font-bold text-xl text-white">
              <span>Ukupna cijena: {grandTotal} KM</span>
            </div>
            <button
              className="mt-10 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms] w-full h-10"
              onClick={() => { setIsVisible(false); setCheck(true); }}
            >
              Nastavi na plaćanje
            </button>
          </div>
        </div>
      )}

      {check && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#282231] text-white p-4 rounded shadow-lg w-80">
            <div className="flex justify-between items-center mb-4 ml-2 mr-2">
              <h2 className="text-lg font-semibold">Potvrdi kupovinu</h2>
              <button onClick={() => {
                setQuantities({});
                setTotals({});
                setGrandTotal(0);
                setCheck(false);
                setIsVisible(false);
                Array.from(document.getElementsByName("NumBoughtTickets")).forEach(input => input.value = 0);
              }} className="text-gray-500 hover:text-gray-800 text-2xl">
                &times;
                </button>
            </div>
            <div className="mb-4 items-center justify-center flex flex-col">
              {Object.entries(quantities).map(([idx, qty]) => qty > 0 && (
                <span key={idx} className="text-white">
                  {tickets[idx].vrstaKarte} x {qty}
                </span>
              ))}
              <div className="font-bold text-xl text-white">
              <span>Ukupna cijena: {grandTotal} KM</span>
            </div>
            </div>
            <button
              className="w-[17rem] ml-2 px-4 py-2 bg-[#ec4899] text-white rounded shadow hover:opacity-70 transition-opacity duration-[400ms]"
              onClick={buyTickets}
            >
              Plati
            </button>
          </div>
        </div>
      )}
      </div>
      )}
      {loading && (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Plaćanje se izvršava...</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px'
  },
  spinner: {
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
      marginBottom: '10px'
  }
};


const injectGlobalStyles = () => {
  if (typeof document !== 'undefined' && !document.getElementById('spin-animation')) {
      const style = document.createElement('style');
      style.id = 'spin-animation';
      style.textContent = `
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
      `;
      document.head.appendChild(style);
  }
};


injectGlobalStyles();

export default ChooseTickets;