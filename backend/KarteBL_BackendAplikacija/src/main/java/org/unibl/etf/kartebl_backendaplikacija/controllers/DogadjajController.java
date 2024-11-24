package org.unibl.etf.kartebl_backendaplikacija.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.DogadjajRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleDogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.services.DogadjajService;

@RestController
@RequestMapping("/dogadjaji")
public class DogadjajController extends CrudController<Integer, DogadjajRequest, DogadjajDto, SingleDogadjajDto> {
    DogadjajService dogadjajService;
    public DogadjajController(DogadjajService dogadjajService) {
        super(dogadjajService, DogadjajDto.class, SingleDogadjajDto.class);
    }


}
