package org.unibl.etf.kartebl_backendaplikacija.models.request;

import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OsobaEntity;
@Data
public class OrganizatorRequest {

    private OsobaEntity korisnickoIme;

    private String jmbg;
}
