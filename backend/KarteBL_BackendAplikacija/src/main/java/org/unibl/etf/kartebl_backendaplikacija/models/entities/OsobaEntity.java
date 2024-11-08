package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "osoba")
public class OsobaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "korisnicko_ime", nullable = false, length = 50)
    private String korisnickoIme;

    @Column(name = "sifra", nullable = false, length = 45)
    private String sifra;

    @Column(name = "ime", nullable = false, length = 45)
    private String ime;

    @Column(name = "prezime", nullable = false, length = 45)
    private String prezime;

    @Column(name = "mail", nullable = false, length = 100)
    private String mail;

    @OneToMany(mappedBy = "korisnickoIme", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<AdministratorEntity> administrators = new LinkedHashSet<>();

    @OneToMany(mappedBy = "korisnickoIme", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<KorisnikEntity> korisniks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "korisnickoIme", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<OrganizatorEntity> organizators = new LinkedHashSet<>();

}