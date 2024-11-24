package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

@Data
public class OsobaDto {

    private Integer id;

    private String korisnickoIme;

    private String sifra;

    private String ime;

    private String prezime;

    private String mail;


}
