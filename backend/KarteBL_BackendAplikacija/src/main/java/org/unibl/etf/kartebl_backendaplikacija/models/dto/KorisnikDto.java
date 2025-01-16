package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AuthoritiesEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;

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
