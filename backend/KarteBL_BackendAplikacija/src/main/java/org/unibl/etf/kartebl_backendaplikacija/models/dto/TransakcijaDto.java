package org.unibl.etf.kartebl_backendaplikacija.models.dto;


import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;


@Data
public class TransakcijaDto {

    private Integer id;


    private KartaEntity idKarta;


}
