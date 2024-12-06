package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class TransakcijaDto {

    private Integer id;

    private String korisnikKorisnickoIme;

    private BigDecimal kartaCijena;

    private String kartaVrstaKarte;

    private String kartaDogadjajNaziv;

    private Integer skeniranaKartaId;


}
