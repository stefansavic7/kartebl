package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

@Data
@Entity
@Table(name = "users")
public class Users
{
    @Basic
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "username", nullable = true, length = 50)
    private String korisnickoIme;
    @Id
    @Column(name = "email", nullable = false, length = 255)
    private String email;
    @Column(name = "password", nullable = false, length = 200)
    private String password;
    @Basic
    @Column(name = "tip", nullable = false, length = 13)
    private String tip;
    
    public Users(KorisnikEntity korisnikEntity)
    {
        this.id = korisnikEntity.getId();
        this.email = korisnikEntity.getEmail();
        this.password = korisnikEntity.getSifra();
        this.korisnickoIme = korisnikEntity.getKorisnickoIme();
        // TODO: tip rijesi
    }
    
    public Users()
    {
    
    }
}
