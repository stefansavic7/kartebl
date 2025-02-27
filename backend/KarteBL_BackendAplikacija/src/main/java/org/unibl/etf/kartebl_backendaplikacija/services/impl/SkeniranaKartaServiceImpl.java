package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.SkeniranaKartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.SkeniranaKartaRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.SkeniranaKartaService;

@Service
public class SkeniranaKartaServiceImpl extends CrudJpaService<SkeniranaKartaEntity, Integer> implements SkeniranaKartaService
{
    SkeniranaKartaRepository repository;
    ModelMapper modelMapper;
    public SkeniranaKartaServiceImpl(SkeniranaKartaRepository repository,ModelMapper modelMapper) {
        super(repository, modelMapper, SkeniranaKartaEntity.class);
    }

}
