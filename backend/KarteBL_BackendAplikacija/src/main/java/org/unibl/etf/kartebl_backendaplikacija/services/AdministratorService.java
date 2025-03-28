package org.unibl.etf.kartebl_backendaplikacija.services;

import org.unibl.etf.kartebl_backendaplikacija.base.CrudService;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleAdministratorDto;


public interface AdministratorService extends CrudService<Integer> {
    public SingleAdministratorDto findByEmail(String email);
}
