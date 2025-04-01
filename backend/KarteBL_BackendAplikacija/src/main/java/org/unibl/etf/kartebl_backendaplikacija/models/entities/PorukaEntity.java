package org.unibl.etf.kartebl_backendaplikacija.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.unibl.etf.kartebl_backendaplikacija.base.BaseEntity;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "poruka")
public class PorukaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "email_posiljaoca", nullable = false, length = 50)
    private String emailPosiljaoca;

    @Size(max = 50)
    @NotNull
    @Column(name = "email_primaoca", nullable = false, length = 50)
    private String emailPrimaoca;

    @NotNull
    @Lob
    @Column(name = "sadrzaj_poruke", nullable = false)
    private String sadrzajPoruke;

    @ColumnDefault("0")
    @Column(name = "procitana")
    private Boolean procitana;

    @Column(name = "datum_vrijeme", updatable = false, nullable = false)
    private Timestamp datumVrijeme = Timestamp.valueOf(LocalDateTime.now());

}