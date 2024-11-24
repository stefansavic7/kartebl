package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OsobaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.OsobaRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleOsobaDto;
import org.unibl.etf.kartebl_backendaplikacija.services.OsobaServiceImpl;

@RestController
@RequestMapping("/osobe")
public class OsobaController extends CrudController<Integer, OsobaRequest, OsobaDto, SingleOsobaDto>{
    OsobaServiceImpl osobaService;
    public OsobaController(OsobaServiceImpl osobaService) {
        super(osobaService, OsobaDto.class, SingleOsobaDto.class);
    }
}
