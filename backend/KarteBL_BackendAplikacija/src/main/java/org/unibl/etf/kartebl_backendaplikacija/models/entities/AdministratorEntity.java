package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.util.List;

@Data
@Entity
@Table(name = "administrator")
public class AdministratorEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "jmbg", nullable = false, length = 13)
    private String jmbg;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "korisnicko_ime", nullable = false, referencedColumnName = "korisnicko_ime")
    @JsonIgnore
    private OsobaEntity osoba;


    @OneToMany(mappedBy = "korisnickoImeAdministrator", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DogadjajEntity> dogadjaji;

    @OneToMany(mappedBy = "korisnickoImeAdministrator", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<OrganizatorEntity> organizatori;

}