package org.unibl.etf.kartebl_backendaplikacija.controllers;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
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
import org.unibl.etf.kartebl_backendaplikacija.models.dto.TransakcijaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.request.DogadjajRequest;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleDogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.services.DogadjajService;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

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
    public ResponseEntity<byte[]> getSlikaZaDogadjaj(@PathVariable Integer id)throws Exception{
        SingleDogadjajDto dogadjaj = dogadjajService.findById(id, SingleDogadjajDto.class);

        Path path= Paths.get(dogadjaj.getPutanjaDoSlike());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(dogadjaj.getTipSlike()));  // ili odgovarajući tip slike (PNG, GIF...)
        return new ResponseEntity<>(Files.readAllBytes(path), headers, HttpStatus.OK);

    }

    @PutMapping("/updateDogadjaj/{id}")
    public DogadjajDto update(@PathVariable Integer id, @RequestPart  DogadjajRequest podaci, @RequestPart MultipartFile slika) throws NotFoundException
    {
        return dogadjajService.update(id, podaci, slika);
    }

    @GetMapping("/transakcijeZaDogadjaj/{id}")
    public List<TransakcijaDto> getTransakcijeZaDogadjaj(@PathVariable Integer id)
    {
        return dogadjajService.getTransakcijeZaDogadjaj(id);
    }


}
