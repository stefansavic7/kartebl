package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.util.List;

@Data
@Entity
@Table(name = "administrator")
public class AdministratorEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "korisnicko_ime", nullable = true, length = 50, unique = true)
    private String korisnickoIme;
    @Basic
    @Column(name = "jmbg", nullable = false, length = 13)
    private String jmbg;
    @Basic
    @Column(name = "sifra", nullable = false, length = 300)
    private String sifra;
    @Basic
    @Column(name = "ime", nullable = false, length = 50)
    private String ime;
    @Basic
    @Column(name = "prezime", nullable = false, length = 50)
    private String prezime;
    @Basic
    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @OneToMany(mappedBy = "administrator")
    @JsonIgnore
    private List<DogadjajEntity> dogadjaji;
    @OneToMany(mappedBy = "administrator")
    @JsonIgnore
    private List<OrganizatorEntity> organizatori;
    
}
