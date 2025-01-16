package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.SkeniranaKartaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.TransakcijaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;

@Data
@EqualsAndHashCode(callSuper = false)
public class SingleSkeniranaKartaDto extends SkeniranaKartaDto {

    private TransakcijaDto transakcija;
}
