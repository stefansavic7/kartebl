package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class KartaDto {

    private Integer id;

    private BigDecimal cijena;

    private byte[] qr;

    private String vrstaKarte;

    private String dogadjajOpis;

    private String organizatorKorisnickoIme;


}
