package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class AdministratorDto {


    private Integer id;

    private String jmbg;

    private String sifra;

    private String ime;

    private String prezime;

    private String email;

    private String korisnickoIme;


}
