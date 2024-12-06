package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.AdministratorRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleAdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.services.AdministratorService;

@RestController
@RequestMapping("/administratori")
public class AdministratorController extends CrudController<Integer, AdministratorRequest, AdministratorDto, SingleAdministratorDto> {
    AdministratorService administratorService;
    public AdministratorController(AdministratorService administratorService) {
        super(administratorService,AdministratorDto.class,SingleAdministratorDto.class);
    }
}
