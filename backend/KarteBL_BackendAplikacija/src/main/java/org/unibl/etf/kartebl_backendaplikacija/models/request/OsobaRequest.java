package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;

@Data
public class OsobaRequest {


    private String korisnickoIme;

    private String sifra;

    private String ime;

    private String prezime;

    private String mail;
}
