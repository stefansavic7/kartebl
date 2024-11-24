package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OsobaEntity;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleAdministratorDto extends AdministratorDto {
    private OsobaEntity osoba;


    private List<DogadjajEntity> dogadjaji;


    private List<OrganizatorEntity> organizatori;
}
