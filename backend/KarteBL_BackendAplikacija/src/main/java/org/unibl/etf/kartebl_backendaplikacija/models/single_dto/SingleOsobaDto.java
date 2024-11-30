package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OsobaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AuthoritiesEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleOsobaDto extends OsobaDto {

    List<AuthoritiesEntity> authorities;
    private List<AdministratorEntity> administrators;
    private List<KorisnikEntity> korisniks;
    private List<OrganizatorEntity> organizators;
}
