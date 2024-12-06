package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

@Data
public class KorisnikDto
{
    private Integer id;
    private String korisnickoIme;
    private String sifra;
    private String email;
    private String ime;
    private String prezime;
}
