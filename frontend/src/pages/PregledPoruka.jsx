import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

//komponenta - omogucava da se pregledaju pristigle poruke. Navigacija kroz navabar.
export const PregledPoruka = () => {
  const [email, setEmail] = useState(null);
  const [poruke, setPoruke] = useState([]);
  const [selektovanaPoruka, setSelektovanaPoruka] = useState(null);
  const [odgovorVisible, setOdgovorVisible] = useState(false);
  const [tekstOdgovora, setTekstOdgovora] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        const token = JSON.parse(tokenString);
        const decodeToken = jwtDecode(token);
        const email = decodeToken.sub;
        setEmail(email);

        const response = await axios.get(
          `http://localhost:9000/poruke/chat/primljene/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       
        setPoruke(response.data.sort((a, b) => b.id - a.id));

      } catch (error) {
        console.error("Greška pri dohvatanju mejla:", error);
      }
    };

    fetchEmail();
  }, []);

  if (selektovanaPoruka) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <button
          onClick={() => {
            setSelektovanaPoruka(null);
            setOdgovorVisible(false);
            setTekstOdgovora("");
          }}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Nazad na sve poruke
        </button>
  
        <div className="border p-4 rounded shadow bg-white space-y-4">
          <p className="text-gray-800">{selektovanaPoruka.sadrzajPoruke}</p>
  
          <button
            onClick={() => setOdgovorVisible(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Odgovori
          </button>
  
          {odgovorVisible && (
            <div className="space-y-2">
              <textarea
                value={tekstOdgovora}
                onChange={(e) => setTekstOdgovora(e.target.value)}
                placeholder="Unesite odgovor..."
                className="w-full p-2 border rounded"
                rows={4}
              />
              <button
                onClick={async () => {
                  try {
                    const tokenString = localStorage.getItem("token");
                    const token = JSON.parse(tokenString);
                    const decodedToken = jwtDecode(token);
                    const emailPosiljaoca = decodedToken.sub;
  
                    const porukaRequest = {
                      emailPosiljaoca: emailPosiljaoca,
                      emailPrimaoca: selektovanaPoruka.emailPosiljaoca,
                      sadrzajPoruke: tekstOdgovora,
                      procitana: false,
                    };
  
                    await axios.post(
                      "http://localhost:9000/poruke",
                      porukaRequest,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                         // "Content-Type": "application/json",
                        },
                      }
                    );
  
                    alert("Poruka je uspješno poslata!");
                    setOdgovorVisible(false);
                    setTekstOdgovora("");
                  } catch (error) {
                    console.error("Greška pri slanju odgovora:", error);
                    alert("Došlo je do greške prilikom slanja.");
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Pošalji
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Primljene poruke</h2>
      {poruke.length === 0 ? (
        <p>Nema poruka za prikaz.</p>
      ) : (
        <ul className="space-y-2">
          {poruke.map((poruka) => (
            <li
              key={poruka.id}
              onClick={async () => {
                console.log("Kliknuta poruka ID:", poruka.id);
              
                try {
                  const tokenString = localStorage.getItem("token");
                  const token = JSON.parse(tokenString);
              
                  await axios.post(
                    `http://localhost:9000/poruke/setPorukaProcitana/${poruka.id}`,
                    {}, 
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
              
                  
                  setPoruke((prev) =>
                    prev.map((p) =>
                      p.id === poruka.id ? { ...p, procitana: true } : p
                    )
                  );
                } catch (error) {
                  console.error("Greška prilikom postavljanja poruke kao pročitane:", error);
                }
              
                setSelektovanaPoruka(poruka);
              }}
              
              className={`cursor-pointer p-3 border rounded hover:bg-gray-100 ${
                poruka.procitana ? "text-gray-600" : "font-bold text-black"
              }`}
            >
              {poruka.sadrzajPoruke}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
