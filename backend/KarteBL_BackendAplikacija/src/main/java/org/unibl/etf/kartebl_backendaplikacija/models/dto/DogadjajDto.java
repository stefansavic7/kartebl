package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
public class DogadjajDto {


    private Integer id;

    private String naziv;

    private Date datum;

    private Time vrijeme;

    private String lokacija;

    private String opis;

    private String putanjaDoSlike;

    private String tipSlike;

    private Integer administratorId;

    private Integer organizatorId;

    private String odobren;

}
