package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.DogadjajRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.DogadjajService;

@Service
public class DogadjajServiceImpl extends CrudJpaService<DogadjajEntity, Integer> implements DogadjajService
{
    DogadjajRepository dogadjajRepository;
    ModelMapper modelMapper;
    public DogadjajServiceImpl(DogadjajRepository dogadjajRepository, ModelMapper modelMapper) {
        super(dogadjajRepository,modelMapper, DogadjajEntity.class);

    }
}
