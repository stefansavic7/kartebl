package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

@Data
public class OrganizatorDto {


    String sifra;

    private Integer id;

    private String korisnickoIme;

    private String email;

    private String jmbg;
    private Integer administratorId;


}
