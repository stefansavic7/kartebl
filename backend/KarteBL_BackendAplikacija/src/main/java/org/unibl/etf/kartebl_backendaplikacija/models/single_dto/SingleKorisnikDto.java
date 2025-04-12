package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.KorisnikDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper=true)
public class SingleKorisnikDto extends KorisnikDto {
    private List<TransakcijaEntity> transakcije;
}
