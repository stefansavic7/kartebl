package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.PorukaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.request.OrganizatorRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.request.PorukaRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleOrganizatorDto;
import org.unibl.etf.kartebl_backendaplikacija.services.Organizatorservice;
import org.unibl.etf.kartebl_backendaplikacija.services.PorukaService;

import java.util.List;

@RestController
@RequestMapping("/poruke")
public class PorukaController extends CrudController<Integer, PorukaRequest, PorukaEntity, PorukaEntity> {

    PorukaService porukaService;

    public PorukaController(PorukaService porukaService) {
        super(porukaService, PorukaEntity.class, PorukaEntity.class);
        this.porukaService = porukaService;
    }

    @GetMapping("/chat/{emailPosiljaoca}/{emailPrimaoca}")
    public List<PorukaEntity> getPoruke(@PathVariable String emailPosiljaoca, @PathVariable String emailPrimaoca)
    {
        return porukaService.vratiPoruke(emailPosiljaoca, emailPrimaoca);
    }
}
