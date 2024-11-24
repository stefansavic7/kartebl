package org.unibl.etf.kartebl_backendaplikacija.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OsobaEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.OsobaRepositoriy;

@Service
public class OsobaServiceImpl extends CrudJpaService<OsobaEntity, Integer> implements OsobaService {

    OsobaRepositoriy osobaRepositoriy;
    ModelMapper modelMapper;

    public OsobaServiceImpl(OsobaRepositoriy osobaRepositoriy, ModelMapper modelMapper) {
        super(osobaRepositoriy, modelMapper, OsobaEntity.class);

    }

}
