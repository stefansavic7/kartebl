package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;


@Data
public class OrganizatorRequest {

    private String korisnickoIme;

    private String sifra;

    private String email;

    private Integer administratorId;

    private String jmbg;
}
