package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

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
    
    private KartaEntity idKarta;
    
    private KorisnikEntity korisnickoImeKorisnik;
    
    private List<SkeniranaKartaEntity> skeniranakartas = new ArrayList<>();
}
