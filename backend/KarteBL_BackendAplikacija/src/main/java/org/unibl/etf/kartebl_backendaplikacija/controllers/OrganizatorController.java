package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.OrganizatorRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleOrganizatorDto;
import org.unibl.etf.kartebl_backendaplikacija.services.Organizatorservice;

@RestController
@RequestMapping("/organizatori")
public class OrganizatorController extends CrudController<Integer, OrganizatorRequest, OrganizatorDto, SingleOrganizatorDto> {

    Organizatorservice organizatorservice;

    public OrganizatorController(Organizatorservice organizatorservice) {
        super(organizatorservice, OrganizatorDto.class, SingleOrganizatorDto.class);
        this.organizatorservice = organizatorservice;
    }

    @GetMapping("/email/{email}")
    public SingleOrganizatorDto getOrganizatorByEmail(@PathVariable String email) {
        return organizatorservice.findByEmail(email);
    }
}
