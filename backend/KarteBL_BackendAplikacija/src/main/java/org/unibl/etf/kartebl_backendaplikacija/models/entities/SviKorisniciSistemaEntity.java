package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import jakarta.persistence.*;
import lombok.*;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

@Data
@Entity
@Table(name = "svi_korisnici_sistema")
public class SviKorisniciSistemaEntity implements BaseEntity<Integer>
{
    @Basic
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "korisnicko_ime", nullable = false, length = 50)
    private String korisnickoIme;
    @Id
    @Column(name = "email", nullable = true, length = 200)
    private String email;
    @Basic
    @Column(name = "tip", nullable = false, length = 13)
    private String tip;
    
}
