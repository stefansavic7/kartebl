package org.unibl.etf.kartebl_backendaplikacija.models.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AuthoritiesEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;

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
