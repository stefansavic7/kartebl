package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class KorisnikDto
{
    private Integer id;
    private String korisnickoIme;
    private String email;
    private String ime;
    private String prezime;
    private String authoritiesUloga;
    private List<Integer> transakcijeId;
}
