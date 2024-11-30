package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.KartaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.TransakcijaDto;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleKartaDto extends KartaDto {

    private DogadjajDto dogadjaj;


    private OrganizatorDto organizator;


    private List<TransakcijaDto> transakcije;

}
