package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.TransakcijaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.TransakcijaRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleAdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleTransakcijaDto;
import org.unibl.etf.kartebl_backendaplikacija.services.TransakcijaService;

@RestController
@RequestMapping("/transakcije")
public class TransakcijaController extends CrudController<Integer, TransakcijaRequest, TransakcijaDto, SingleTransakcijaDto>
{
    public TransakcijaController(TransakcijaService transakcijaService)
    {
        super(transakcijaService, TransakcijaDto.class, SingleTransakcijaDto.class);
    }
}