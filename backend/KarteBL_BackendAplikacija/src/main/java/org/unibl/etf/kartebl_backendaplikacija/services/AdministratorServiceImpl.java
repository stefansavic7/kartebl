package org.unibl.etf.kartebl_backendaplikacija.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.AdministratorRepository;

@Service
public class AdministratorServiceImpl extends CrudJpaService<AdministratorEntity, Integer> implements AdministratorService {
    AdministratorRepository repository;
    ModelMapper modelMapper;

    public AdministratorServiceImpl(AdministratorRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, AdministratorEntity.class);

    }
}
