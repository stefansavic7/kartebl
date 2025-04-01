package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.util.List;

@Data
@Entity
@Table(name = "korisnik")
public class KorisnikEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "korisnicko_ime", nullable = true, length = 50)
    private String korisnickoIme;
    @Basic
    @Column(name = "sifra", nullable = false, length = 200)
    private String sifra;
    @Basic
    @Column(name = "email", nullable = false, length = 255)
    private String email;
    @Basic
    @Column(name = "ime", nullable = true, length = 50)
    private String ime;
    @Basic
    @Column(name = "prezime", nullable = true, length = 50)
    private String prezime;

    @OneToMany(mappedBy = "korisnik")
    @JsonIgnore
    private List<TransakcijaEntity> transakcije;
    
    public KorisnikEntity(Users user)
    {
        this.id = user.getId();
        this.email = user.getEmail();
        this.sifra = user.getPassword();
        this.korisnickoIme = user.getKorisnickoIme();
        
        //TODO: authority dodaj
    }
    
    public KorisnikEntity()
    {
    
    }
}
