package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    TransakcijaService transakcijaService;

    public TransakcijaController(TransakcijaService transakcijaService)
    {
        super(transakcijaService, TransakcijaDto.class, SingleTransakcijaDto.class);
        this.transakcijaService = transakcijaService;
    }

    @PostMapping("/generate")
    public ResponseEntity<TransakcijaDto> generate (@RequestBody TransakcijaRequest transakcijaRequest) throws Exception{
        return ResponseEntity.ok(transakcijaService.generate(transakcijaRequest));

    }
}
