package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;
<<<<<<< HEAD
=======
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
>>>>>>> 4ccb7ec1b50323087c551c341f9dde8875e95113

import java.util.List;

@Data
<<<<<<< HEAD
@EqualsAndHashCode(callSuper=true)
public class SingleOrganizatorDto extends OrganizatorDto {

    private AdministratorDto administrator;

    private List<DogadjajDto> dogadjaji;
=======
public class SingleOrganizatorDto extends OrganizatorDto
{
    
    private AdministratorEntity administrator;
    
    private List<DogadjajEntity> dogadjaji;
>>>>>>> 4ccb7ec1b50323087c551c341f9dde8875e95113
}
