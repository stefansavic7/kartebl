package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.SkeniranaKartaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.SkeniranaKartaRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleSkeniranaKartaDto;
import org.unibl.etf.kartebl_backendaplikacija.services.SkeniranaKartaService;

@RestController
@RequestMapping("/skeniraneKarte")
public class SkeniranaKartaController extends CrudController<Integer, SkeniranaKartaRequest, SkeniranaKartaDto, SingleSkeniranaKartaDto> {
    SkeniranaKartaService service;

    public SkeniranaKartaController(SkeniranaKartaService service) {
        super(service, SkeniranaKartaDto.class, SingleSkeniranaKartaDto.class);

    }
}
