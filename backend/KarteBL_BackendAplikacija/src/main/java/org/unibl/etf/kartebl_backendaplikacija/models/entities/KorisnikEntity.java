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
@Table(name = "korisnik")
public class KorisnikEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private OsobaEntity korisnickoIme;

    @OneToMany(mappedBy = "korisnickoImeKorisnik", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<TransakcijaEntity> transakcijas = new LinkedHashSet<>();

}