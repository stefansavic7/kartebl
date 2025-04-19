import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";



export const Orders = () => {

    const [korisnikMail, setKorisnikMail] = useState(null);
    const [karte, setKarte] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    

    useEffect(() => {
      const tokenString = localStorage.getItem("token");
      
      if (tokenString) {
          try {
              const token = JSON.parse(tokenString);
              const decodedToken = jwtDecode(token);
              setKorisnikMail(decodedToken.sub || "Nepoznat email");
              setToken(token);
          } catch (error) {
              console.error("Greška pri dekodiranju tokena:", error);
              setKorisnikMail("Greška pri učitavanju emaila");
          }
      } else {
          setKorisnikMail("Nema prijavljenog korisnika");
      }
  }, []);

  useEffect(() => {
    if (korisnikMail && token && korisnikMail !== "Nema prijavljenog korisnika") {
        const fetchKarte = async () => {
            try {
               
                const response = await axios.get(
                      `http://localhost:9000/korisnici/email/${korisnikMail}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                
                const transakcije=response.data.transakcije;
                const karte = transakcije
                    .filter(transaction => transaction?.karta) 
                    .map(transaction => transaction.karta);

                  setKarte(karte);

                const kartaSaSlikom = await Promise.all(
                    karte.map(async (karta) => {
                        try {
                            const imageResponse = await axios.get(
                                `http://localhost:9000/dogadjaji/dogadjaj/${karta.dogadjaj.id}/slika`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    },
                                    responseType: "blob"
                                }
                            );
                            
                            
                            const slikaUrl = URL.createObjectURL(imageResponse.data);
                            return { ...karta, slikaUrl };
                        } catch (imageError) {
                            console.error("Greška pri dobavljanju slike:", imageError);
                            return { ...karta, slikaUrl: null };
                        }
                    })
                );

                setKarte(kartaSaSlikom);

                //console.log(kartaSaSlikom)
                //dodati datum i lokaciju
                //vidjeti treba li ukinuti "aktivan"
                
            } catch (error) {
                console.error("Greška prilikom fetchovanja karte:", error);
                setError("Ne mogu da učitam događaje.");
            } finally {
                setLoading(false);
            }
        };

        fetchKarte();
    }
}, [korisnikMail, token]);

useEffect(() => {
  return () => {
      karte.forEach(karta => {
          if (karta.slikaUrl) {
              URL.revokeObjectURL(karta.slikaUrl);
          }
      });
  };
}, [karte]);


return (
  <div style={styles.container}>
      <h1 style={styles.header}>Moje karte</h1>
      
      {loading && (
          <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Učitavanje karata...</p>
          </div>
      )}
      
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cardsContainer}>
          {karte.map((karta, index) => (
              <div 
                  key={`${karta.id}-${index}-${karta.dogadjaj?.id}`} 
                  style={styles.card}
              >
                  <div style={styles.imageContainer}>
                      {karta.slikaUrl ? (
                          <img 
                              src={karta.slikaUrl} 
                              alt={karta.dogadjaj?.naziv || 'Karta'}
                              style={styles.image}
                              onLoad={() => URL.revokeObjectURL(karta.slikaUrl)}
                          />
                      ) : (
                          <div style={styles.imagePlaceholder}>
                              Nema dostupne slike
                          </div>
                      )}
                  </div>
                  <div style={styles.cardContent}>
                      <h3 style={styles.eventTitle}>
                          {karta.dogadjaj?.naziv || 'Nepoznat događaj'}
                      </h3>
                      <div style={styles.eventDetails}>
                          <p style={styles.detailItem}>
                              <span style={styles.detailLabel}>Tip karte:</span> 
                              {karta.vrstaKarte}
                          </p>
                          <p style={styles.detailItem}>
                              <span style={styles.detailLabel}>Cijena:</span> 
                              {karta.cijena?.toFixed(2)}€
                          </p>
                          <p style={styles.detailItem}>
                              <span style={styles.detailLabel}>Lokacija:</span> 
                              {karta.dogadjaj.lokacija}
                          </p>
                          <p style={styles.detailItem}>
                               <span style={styles.detailLabel}>Vrijeme:</span> 
                               {karta.dogadjaj.vrijeme?.slice(0, 5)}
                          </p>
                          <p style={styles.detailItem}>
                              <span style={styles.detailLabel}>Datum:</span> 
                              {karta.dogadjaj.datum}
                          </p>
                      </div>
                  </div>
              </div>
          ))}
      </div>
      
      {!loading && !error && karte.length === 0 && (
          <p style={styles.noCards}>Nemate ni jednu kupljenu kartu</p>
      )}
  </div>
);

};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    height: '100%',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '40px',
    fontSize: '2.5em'
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    padding: '20px'
  },
  card: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      ':hover': {
          transform: 'translateY(-5px)'
      }
  },
  imageContainer: {
      height: '200px',
      backgroundColor: '#f5f6fa'
  },
  image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
  },
  imagePlaceholder: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#7f8c8d'
  },
  cardContent: {
      padding: '20px'
  },
  eventTitle: {
      margin: '0 0 15px 0',
      color: '#2c3e50',
      fontSize: '1.4em'
  },
  eventDetails: {
      marginBottom: '20px'
  },
  detailItem: {
      margin: '8px 0',
      fontSize: '0.95em',
      color: '#34495e'
  },
  detailLabel: {
      fontWeight: '600',
      marginRight: '8px'
  },
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
  },
  error: {
      color: '#e74c3c',
      textAlign: 'center',
      padding: '20px',
      fontWeight: 'bold'
  },
  noCards: {
      textAlign: 'center',
      color: '#7f8c8d',
      fontSize: '1.2em',
      marginTop: '20px'
  }
};




