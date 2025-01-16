package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.KorisnikDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.KorisnikRequest;
import org.unibl.etf.kartebl_backendaplikacija.services.KorisnikService;

@RestController
@RequestMapping("/korisnici")
public class KorisnikController extends CrudController<Integer, KorisnikRequest, KorisnikDto, KorisnikDto>
{
    public KorisnikController(KorisnikService korisnikService)
    {
        super(korisnikService, KorisnikDto.class, KorisnikDto.class);
    }
}
