package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.sql.Date;
import java.sql.Time;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "dogadjaj")
public class DogadjajEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;

    @Column(name = "datum", nullable = false)
    private Date datum;

    @Column(name = "vrijeme", nullable = false)
    private Time vrijeme;

    @Column(name = "lokacija", nullable = false, length = 45)
    private String lokacija;

    @Column(name = "opis", length = 500)
    private String opis;

    @Column(name = "slika")
    private byte[] slika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime_organizator", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private OrganizatorEntity korisnickoImeOrganizator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "korisnicko_ime_administrator", referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private AdministratorEntity korisnickoImeAdministrator;

    @OneToMany(mappedBy = "idDogadjaj", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<KartaEntity> kartas = new LinkedHashSet<>();

}