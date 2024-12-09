package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;

import java.sql.Time;

@Data
public class SkeniranaKartaRequest {

    private Time vrijemeSkeniranja;

    private int transakcijaId;
}
