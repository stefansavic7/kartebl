package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.NotFoundException;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.OrganizatorRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.Organizatorservice;

@Service
public class OrganizatorServiceImpl extends CrudJpaService<OrganizatorEntity, Integer> implements Organizatorservice
{
    OrganizatorRepository organizatorRepository;
    ModelMapper modelMapper;
    @PersistenceContext
    private EntityManager entityManager;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public  OrganizatorServiceImpl(OrganizatorRepository organizatorRepository, ModelMapper modelMapper) {
        super(organizatorRepository,modelMapper, OrganizatorEntity.class);
        this.modelMapper = modelMapper;
        this.organizatorRepository = organizatorRepository;
    }
    
    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass) {
        OrganizatorEntity entity = modelMapper.map(object, OrganizatorEntity.class);
        entity.setId(null);
        entity.setSifra(encoder.encode(entity.getSifra()));
        entity = organizatorRepository.saveAndFlush(entity);
        entityManager.refresh(entity);
        return modelMapper.map(entity, resultDtoClass);
    }
    
    @Override
    public <T, U> T update(Integer id, U object, Class<T> resultDtoClass) {
        if (!organizatorRepository.existsById(id))
            throw new NotFoundException();
        OrganizatorEntity entity = modelMapper.map(object, OrganizatorEntity.class);
        entity.setId(id);
        entity.setSifra(encoder.encode(entity.getSifra()));
        entity = organizatorRepository.saveAndFlush(entity);
        entityManager.refresh(entity);
        return modelMapper.map(entity, resultDtoClass);
    }
}
