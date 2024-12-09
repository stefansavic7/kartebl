package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.SkeniranaKartaEntity;

import java.util.ArrayList;
import java.util.List;

@Data
public class SingleTransakcijaDto
{
    private Integer id;
    private KorisnikEntity korisnik;
    private KartaEntity karta;
    private SkeniranaKartaEntity skeniranaKarta;
}
