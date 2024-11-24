package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;


import java.util.List;

@Getter
@Entity
@Table(name = "osoba")
public class OsobaEntity implements BaseEntity<Integer> {
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

    @OneToMany(mappedBy = "osoba", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<AdministratorEntity> administrators;

    @OneToMany(mappedBy = "korisnickoIme", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<KorisnikEntity> korisniks;

    @OneToMany(mappedBy = "osoba", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<OrganizatorEntity> organizators;

    @OneToMany(mappedBy = "osoba", fetch = FetchType.EAGER)
    @JsonIgnore
    List<AuthorityEntity> authorities;

    @Override
    public void setId(Integer integer) {
        this.id = integer;
    }
}