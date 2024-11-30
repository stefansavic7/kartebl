package org.unibl.etf.kartebl_backendaplikacija.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.repositories.DogadjajRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.KartaRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.OrganizatorRepository;

@Service
public class KartaServiceImpl extends CrudJpaService<KartaEntity, Integer> implements KartaService {



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
