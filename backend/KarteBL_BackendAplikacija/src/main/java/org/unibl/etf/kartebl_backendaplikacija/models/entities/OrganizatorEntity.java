package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "organizator")
public class OrganizatorEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private OsobaEntity osoba;

    @Column(name = "jmbg", nullable = false, length = 13)
    private String jmbg;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime_administrator", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private AdministratorEntity korisnickoImeAdministrator;

    @OneToMany(mappedBy = "korisnickoImeOrganizator", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DogadjajEntity> dogadjaji;

}