package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

@Data
@Entity
@Table(name = "transakcija")
public class TransakcijaEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnik;
    @ManyToOne
    @JoinColumn(name = "karta_id", referencedColumnName = "id", nullable = false)
    private KartaEntity karta;
    @OneToOne(mappedBy = "transakcija")
    @JsonIgnore
    private SkeniranaKartaEntity skeniranaKarta;
    
}
