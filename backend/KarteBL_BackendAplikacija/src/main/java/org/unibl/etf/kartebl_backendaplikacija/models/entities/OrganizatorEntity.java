package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.util.List;

@Data
@Entity
@Table(name = "organizator")
public class OrganizatorEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "korisnicko_ime", nullable = false, length = 50)
    private String korisnickoIme;
    @Basic
    @Column(name = "jmbg", nullable = false, length = 13)
    private String jmbg;
    @Basic
    @Column(name = "sifra", nullable = true, length = 200)
    private String sifra;
    @Basic
    @Column(name = "email", nullable = true, length = 70)
    private String email;
    @OneToMany(mappedBy = "organizator")
    @JsonIgnore
    private List<AuthoritiesEntity> authorities;
    @OneToMany(mappedBy = "organizator")
    @JsonIgnore
    private List<DogadjajEntity> dogadjaji;
    @OneToMany(mappedBy = "organizator")
    @JsonIgnore
    private List<KartaEntity> karte;
    @ManyToOne
    @JoinColumn(name = "administrator_id", referencedColumnName = "id", nullable = false)
    private AdministratorEntity administrator;
    
}
