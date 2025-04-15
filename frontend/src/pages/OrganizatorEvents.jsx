import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const OrganizatorEvents = () => {
    const [organizatorMail, setOrganizatorMail] = useState(null);
    const [dogadjaji, setDogadjaji] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        
        if (tokenString) {
            try {
                const token = JSON.parse(tokenString);
                const decodedToken = jwtDecode(token);
                setOrganizatorMail(decodedToken.sub || "Nepoznat email");
                setToken(token);
            } catch (error) {
                console.error("Greška pri dekodiranju tokena:", error);
                setOrganizatorMail("Greška pri učitavanju emaila");
            }
        } else {
            setOrganizatorMail("Nema prijavljenog organizatora");
        }
    }, []);

    useEffect(() => {
        if (organizatorMail && token && organizatorMail !== "Nema prijavljenog organizatora") {
            const fetchDogadjaji = async () => {
                try {
                   
                    const response = await axios.get(
                        `http://localhost:9000/organizatori/email/${organizatorMail}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                   
                    const dogadjajiSaSlikama = await Promise.all(
                        response.data.dogadjaji.map(async (dogadjaj) => {
                            try {
                                const imageResponse = await axios.get(
                                    `http://localhost:9000/dogadjaji/dogadjaj/${dogadjaj.id}/slika`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        },
                                        responseType: "blob"
                                    }
                                );
                                
                                
                                const slikaUrl = URL.createObjectURL(imageResponse.data);
                                return { ...dogadjaj, slikaUrl };
                            } catch (imageError) {
                                console.error("Greška pri dobavljanju slike:", imageError);
                                return { ...dogadjaj, slikaUrl: null };
                            }
                        })
                    );

                    setDogadjaji(dogadjajiSaSlikama);
                } catch (error) {
                    console.error("Greška prilikom fetchovanja događaja:", error);
                    setError("Ne mogu da učitam događaje.");
                } finally {
                    setLoading(false);
                }
            };

            fetchDogadjaji();
        }
    }, [organizatorMail, token]);

    
    useEffect(() => {
        return () => {
            dogadjaji.forEach(dogadjaj => {
                if (dogadjaj.slikaUrl) {
                    URL.revokeObjectURL(dogadjaj.slikaUrl);
                }
            });
        };
    }, [dogadjaji]);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Moji događaji:</h1>
            
            {loading && (
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p>Učitavanje događaja...</p>
                </div>
            )}
            
            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.cardsContainer}>
                {dogadjaji.map(dogadjaj => (
                    <div key={dogadjaj.id} style={styles.card}>
                        <div style={styles.imageContainer}>
                            {dogadjaj.slikaUrl ? (
                                <img 
                                    src={dogadjaj.slikaUrl} 
                                    alt={dogadjaj.naziv}
                                    style={styles.image}
                                />
                            ) : (
                                <div style={styles.imagePlaceholder}>
                                    Nema dostupne slike
                                </div>
                            )}
                        </div>
                        <div style={styles.cardContent}>
                            <h3 style={styles.eventTitle}>{dogadjaj.naziv}</h3>
                            <div style={styles.eventDetails}>
                                <p style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Datum:</span> 
                                    {new Date(dogadjaj.datum).toLocaleDateString()}
                                </p>
                                <p style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Vrijeme:</span> 
                                    {dogadjaj.vrijeme.slice(0, 5)}
                                </p>
                                <p style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Lokacija:</span> 
                                    {dogadjaj.lokacija}
                                </p>
                                <p style={{
                                    ...styles.status,
                                    color: dogadjaj.odobren === 'aktivan' ? '#4CAF50' : '#FF5722'
                                }}>
                                    {dogadjaj.odobren}
                                </p>
                            </div>
                            <button 
                                style={styles.button}
                                onClick={() => {/* Dodaj funkcionalnost klikom */}}
                            >
                                Pregledaj
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
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
    status: {
        fontSize: '0.9em',
        fontWeight: 'bold',
        margin: '10px 0'
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#2980b9'
        }
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
