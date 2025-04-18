package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleAdministratorDto extends AdministratorDto {




    private List<DogadjajDto> dogadjaji;

    private List<OrganizatorDto> organizatori;
}
