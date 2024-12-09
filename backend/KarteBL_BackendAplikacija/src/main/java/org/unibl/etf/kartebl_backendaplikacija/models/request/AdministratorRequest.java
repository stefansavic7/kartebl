package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;

@Data
public class AdministratorRequest {

    private String korisnickoIme;

    private String jmbg;

    private String sifra;

    private String ime;

    private String prezime;

    private String email;

}
