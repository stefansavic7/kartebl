package org.unibl.etf.kartebl_backendaplikacija.models.dto;



import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;


import lombok.Data;

import java.math.BigDecimal;



@Data
public class TransakcijaDto {

    private Integer id;

    private String korisnikKorisnickoIme;

    private String korisnikEmail;

    private BigDecimal kartaCijena;

    private String kartaVrstaKarte;

    private String kartaDogadjajNaziv;

    private Integer skeniranaKartaId;

    private String qr;

    private String status;



}
