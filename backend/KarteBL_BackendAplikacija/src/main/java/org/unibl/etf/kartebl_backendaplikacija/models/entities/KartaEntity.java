package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Data
@Entity
@Table(name = "karta")
public class KartaEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "cijena", nullable = false, precision = 2)
    private BigDecimal cijena;

    @Basic
    @Column(name = "vrsta_karte", nullable = true, length = 100)
    private String vrstaKarte;
    @ManyToOne
    @JoinColumn(name = "dogadjaj_id", referencedColumnName = "id", nullable = false)
    private DogadjajEntity dogadjaj;
    @ManyToOne
    @JoinColumn(name = "organizator_id", referencedColumnName = "id", nullable = false)
    private OrganizatorEntity organizator;
    @OneToMany(mappedBy = "karta")
    @JsonIgnore
    private List<TransakcijaEntity> transakcije;
    
}
