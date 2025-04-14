package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Data
@Entity
@Table(name = "dogadjaj")
public class DogadjajEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;

    @Basic
    @Column(name = "datum", nullable = false)
    private Date datum;

    @Basic
    @Column(name = "vrijeme", nullable = false)
    private Time vrijeme;

    @Basic
    @Column(name = "lokacija", nullable = false, length = 45)
    private String lokacija;

    @Basic
    @Column(name = "opis", nullable = true, length = 500)
    private String opis;

    @Basic
    @Column(name = "slika", nullable = true)
    private String putanjaDoSlike;

    @Column(name = "odobren")
    private String odobren;

    @Column(name = "tip_slike")
    private String tipSlike;

    @ManyToOne
    @JoinColumn(name = "administrator_id", referencedColumnName = "id", nullable = false)
    private AdministratorEntity administrator;

    @ManyToOne
    @JoinColumn(name = "organizator_id", referencedColumnName = "id", nullable = false)
    private OrganizatorEntity organizator;

    @OneToMany(mappedBy = "dogadjaj")
    @JsonIgnore
    private List<KartaEntity> karte;
    
}
