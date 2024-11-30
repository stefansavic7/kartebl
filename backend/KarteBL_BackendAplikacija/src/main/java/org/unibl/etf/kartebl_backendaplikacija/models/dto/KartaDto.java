package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

@Data
public class KartaDto {

    private Integer id;

    private Double cijena;

    private String vrstaKarte;

    private byte[] qr;


}
