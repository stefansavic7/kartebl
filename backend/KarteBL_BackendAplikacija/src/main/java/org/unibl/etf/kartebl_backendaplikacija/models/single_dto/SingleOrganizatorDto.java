package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OsobaEntity;

import java.util.List;
@Data
public class SingleOrganizatorDto extends OrganizatorDto {

    private AdministratorEntity administrator;

    private OsobaEntity osoba;

    private List<DogadjajEntity> dogadjaji;
}
