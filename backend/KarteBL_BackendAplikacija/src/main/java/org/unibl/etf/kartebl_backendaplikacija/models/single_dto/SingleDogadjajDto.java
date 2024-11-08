package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleDogadjajDto extends DogadjajDto {

    private OrganizatorEntity korisnickoImeOrganizator;


    private AdministratorEntity korisnickoImeAdministrator;


    private Set<KartaEntity> kartas = new LinkedHashSet<>();
}
