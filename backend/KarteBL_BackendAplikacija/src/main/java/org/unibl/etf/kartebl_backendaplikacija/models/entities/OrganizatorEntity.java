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
@Table(name = "organizator")
public class OrganizatorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private OsobaEntity korisnickoIme;

    @Column(name = "jmbg", nullable = false, length = 13)
    private String jmbg;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime_administrator", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private AdministratorEntity korisnickoImeAdministrator;

    @OneToMany(mappedBy = "korisnickoImeOrganizator", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<DogadjajEntity> dogadjajs = new LinkedHashSet<>();

    @OneToMany(mappedBy = "korisnickoImeOrganizator", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<KartaEntity> kartas = new LinkedHashSet<>();

}