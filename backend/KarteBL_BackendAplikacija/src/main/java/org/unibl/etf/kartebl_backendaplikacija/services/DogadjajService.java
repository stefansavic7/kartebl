package org.unibl.etf.kartebl_backendaplikacija.services;

import org.springframework.web.multipart.MultipartFile;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudService;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.DogadjajRequest;

public interface DogadjajService extends CrudService<Integer> {
    DogadjajDto insertWithPicture(DogadjajRequest podaci, MultipartFile slika);
    public DogadjajDto update( Integer id,  DogadjajRequest podaci,  MultipartFile slika);
}
