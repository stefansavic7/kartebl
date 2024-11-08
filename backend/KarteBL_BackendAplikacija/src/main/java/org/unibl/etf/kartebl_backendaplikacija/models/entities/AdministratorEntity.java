package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "administrator")
public class AdministratorEntity {
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

    @OneToMany(mappedBy = "korisnickoImeAdministrator", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<DogadjajEntity> dogadjajs = new LinkedHashSet<>();

    @OneToMany(mappedBy = "korisnickoImeAdministrator", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<OrganizatorEntity> organizators = new LinkedHashSet<>();

}