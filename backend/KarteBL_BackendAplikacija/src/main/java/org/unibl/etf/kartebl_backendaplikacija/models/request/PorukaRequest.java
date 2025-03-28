package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;

import java.time.Instant;

@Data
public class PorukaRequest {


    private String emailPosiljaoca;


    private String emailPrimaoca;


    private String sadrzajPoruke;


    private Boolean procitana;


}
