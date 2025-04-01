package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;

import java.util.List;

@Data
public class KorisnikRequest
{
    private String korisnickoIme;
    private String sifra;
    private String email;
    private String ime;
    private String prezime;
    private Integer authoritiesId;
    private List<Integer> transakcijeId;
}
