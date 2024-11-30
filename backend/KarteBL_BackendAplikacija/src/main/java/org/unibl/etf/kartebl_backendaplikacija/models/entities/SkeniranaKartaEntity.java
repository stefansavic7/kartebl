package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @OneToOne(mappedBy = "skeniranakarta")
    @JsonIgnore
    private TransakcijaEntity transakcija;
    
}
