package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.sql.Time;

@Data
@Entity
@Table(name = "skenirana_karta")
public class SkeniranaKartaEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "vrijeme_skeniranja", nullable = false)
    private Time vrijemeSkeniranja;
    @OneToOne
    @JoinColumn(name = "transakcija_id", referencedColumnName = "id")
    private TransakcijaEntity transakcija;
    
}
