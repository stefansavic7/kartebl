package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AuthorityDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;

@Data
@EqualsAndHashCode(callSuper=true)
public class SingleAuthorityDto extends AuthorityDto {

    private AdministratorDto administrator;


    private OrganizatorDto organizator;


    //private KorisnikDto korisnik; TODO
}
