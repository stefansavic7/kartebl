package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;

@Data
public class KartaRequest {

    private Double cijena;

    private String vrstaKarte;

    int organizatorId;

    int dogadjajId;

    int maxBrojKarata;

}
