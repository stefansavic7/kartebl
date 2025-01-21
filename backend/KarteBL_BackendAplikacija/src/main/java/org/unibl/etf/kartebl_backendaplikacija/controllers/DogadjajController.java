package org.unibl.etf.kartebl_backendaplikacija.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudController;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.NotFoundException;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.request.DogadjajRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleDogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.services.DogadjajService;

@RestController
@RequestMapping("/dogadjaji")
public class DogadjajController extends CrudController<Integer, DogadjajRequest, DogadjajDto, SingleDogadjajDto> {
    @Autowired
    DogadjajService dogadjajService;
    public DogadjajController(DogadjajService dogadjajService) {
        super(dogadjajService, DogadjajDto.class, SingleDogadjajDto.class);
    }


    @PostMapping("/insertDogadjaj")
    public DogadjajDto insertWithPicture(@RequestPart DogadjajRequest podaci, @RequestPart MultipartFile slika) throws NotFoundException
    {
        return dogadjajService.insertWithPicture(podaci, slika);

    }

    @GetMapping("/dogadjaj/{id}/slika")
    public ResponseEntity<byte[]> getSlika(@PathVariable Integer id) {
        SingleDogadjajDto dogadjaj = dogadjajService.findById(id, SingleDogadjajDto.class);
        byte[] slika = dogadjaj.getSlika();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(dogadjaj.getTipSlike()));  // ili odgovarajući tip slike (PNG, GIF...)
        return new ResponseEntity<>(slika, headers, HttpStatus.OK);
    }

    @PutMapping("/updateDogadjaj/{id}")
    public DogadjajDto update(@PathVariable Integer id, @RequestPart  DogadjajRequest podaci, @RequestPart MultipartFile slika) throws NotFoundException
    {
        return dogadjajService.update(id, podaci, slika);
    }


}
