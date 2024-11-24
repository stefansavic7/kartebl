package org.unibl.etf.kartebl_backendaplikacija.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.OrganizatorRepository;

@Service
public class OrganizatorServiceImpl extends CrudJpaService<OrganizatorEntity, Integer> implements Organizatorservice
{
    OrganizatorRepository organizatorRepository;
    ModelMapper modelMapper;

    public  OrganizatorServiceImpl(OrganizatorRepository organizatorRepository, ModelMapper modelMapper) {
        super(organizatorRepository,modelMapper,OrganizatorEntity.class);
    }
}
