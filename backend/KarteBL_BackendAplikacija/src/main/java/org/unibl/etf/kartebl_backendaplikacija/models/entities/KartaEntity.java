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
@Table(name = "karta")
public class KartaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "cijena", nullable = false)
    private Double cijena;

    @Column(name = "vrsta_karte", length = 50)
    private String vrstaKarte;

    @Column(name = "qr", nullable = false)
    private byte[] qr;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_dogadjaj", nullable = false)
    @JsonIgnore
    private DogadjajEntity idDogadjaj;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime_organizator", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private OrganizatorEntity korisnickoImeOrganizator;

    @OneToMany(mappedBy = "idKarta", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<TransakcijaEntity> transakcijas = new LinkedHashSet<>();

}