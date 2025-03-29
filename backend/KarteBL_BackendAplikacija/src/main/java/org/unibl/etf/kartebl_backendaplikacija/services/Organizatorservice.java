package org.unibl.etf.kartebl_backendaplikacija.services;

import org.unibl.etf.kartebl_backendaplikacija.base.CrudService;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleOrganizatorDto;

public interface Organizatorservice extends CrudService<Integer> {
    SingleOrganizatorDto findByEmail(String email);
}
