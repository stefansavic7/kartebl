package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.*;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.KartaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.KartaRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleKartaDto;
import org.unibl.etf.kartebl_backendaplikacija.services.KartaService;

@RestController
@RequestMapping("/karte")
public class KartaController extends CrudController<Integer, KartaRequest, KartaDto, SingleKartaDto> {
    KartaService kartaService;

    public KartaController(KartaService kartaService) {
        super(kartaService,KartaDto.class,SingleKartaDto.class);
        this.kartaService = kartaService;
    }

    @PutMapping("/update/{id}")
    public KartaDto updateKarta(@PathVariable Integer id, @RequestBody KartaRequest kartaRequest)throws Exception {
        return kartaService.updateKarta(kartaRequest, id);
    }
}
