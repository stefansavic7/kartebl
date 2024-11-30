package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;

import java.math.BigDecimal;
import java.util.List;

@Data
public class KartaDto {

    private Integer id;

    private BigDecimal cijena;

    private byte[] qr;

    private String vrstaKarte;

    private String dogadjajOpis;

    private String organizatorKorisnickoIme;




}
