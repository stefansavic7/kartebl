package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

@Data
@Entity
@Table(name = "authorities")
public class AuthoritiesEntity implements BaseEntity<Integer>
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "uloga", nullable = true, length = 30)
    private String uloga;
    @ManyToOne
    @JoinColumn(name = "administrator_id", referencedColumnName = "id")
    private AdministratorEntity administrator;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id")
    private KorisnikEntity korisnik;
    @ManyToOne
    @JoinColumn(name = "organizator_id", referencedColumnName = "id")
    private OrganizatorEntity organizator;
    
}
