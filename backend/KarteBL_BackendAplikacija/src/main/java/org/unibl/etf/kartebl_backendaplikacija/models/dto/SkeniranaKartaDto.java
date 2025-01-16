package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import lombok.Data;

import java.sql.Time;

@Data
public class SkeniranaKartaDto {

    private Integer id;
    private Time vrijemeSkeniranja;
}
