package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

@Data
public class AuthorityDto {

    Integer idAdministrator;

    Integer idOrganizator;

    Integer idKorisnik;

    private Integer id;

    private String uloga;

}
