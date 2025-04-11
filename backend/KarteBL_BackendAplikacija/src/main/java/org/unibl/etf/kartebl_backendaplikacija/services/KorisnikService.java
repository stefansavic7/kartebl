package org.unibl.etf.kartebl_backendaplikacija.services;

import org.unibl.etf.kartebl_backendaplikacija.base.CrudService;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleKorisnikDto;

public interface KorisnikService extends CrudService<Integer>
{
    SingleKorisnikDto nadjiPoEmail(String email);
}
