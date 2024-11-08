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
@Table(name = "transakcija")
public class TransakcijaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_karta", nullable = false)
    @JsonIgnore
    private KartaEntity idKarta;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime_korisnik", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private KorisnikEntity korisnickoImeKorisnik;

    @OneToMany(mappedBy = "idTransakcija", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<SkeniranaKartaEntity> skeniranakartas = new LinkedHashSet<>();

}