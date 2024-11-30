package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Data
public class DogadjajDto {


    private Integer id;

    private String naziv;

    private Date datum;

    private Time vrijeme;

    private String lokacija;

    private String opis;

    private byte[] slika;

    private String administratorKorisnickoIme;

    private String organizatorKorisnickoIme;




}
