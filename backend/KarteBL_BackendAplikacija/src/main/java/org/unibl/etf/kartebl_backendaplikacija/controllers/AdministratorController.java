package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        this.administratorService = administratorService;
    }

    @GetMapping("/email/{email}")
    public SingleAdministratorDto getAdministrator(@PathVariable String email) {
        return administratorService.findByEmail(email);
    }
}
