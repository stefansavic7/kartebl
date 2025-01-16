package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.DogadjajRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.KartaRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.OrganizatorRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.KartaService;

@Service
public class KartaServiceImpl extends CrudJpaService<KartaEntity, Integer> implements KartaService
{



    public KartaRepository repository;
    private ModelMapper modelMapper;
    DogadjajRepository dogadjajRepository;
    OrganizatorRepository organizatorRepository;

    public KartaServiceImpl(KartaRepository repository, ModelMapper modelMapper, DogadjajRepository dogadjajRepository, OrganizatorRepository organizatorRepository) {
        super(repository, modelMapper, KartaEntity.class);
        this.dogadjajRepository = dogadjajRepository;
        this.organizatorRepository = organizatorRepository;

    }


}
