package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.NotFoundException;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.AdministratorRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.AdministratorService;

@Service
public class AdministratorServiceImpl extends CrudJpaService<AdministratorEntity, Integer> implements AdministratorService
{
    AdministratorRepository repository;
    ModelMapper modelMapper;
    @PersistenceContext
    private EntityManager entityManager;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public AdministratorServiceImpl(AdministratorRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, AdministratorEntity.class);
        this.modelMapper = modelMapper;
        this.repository = repository;
    }
    
    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass) {
        AdministratorEntity entity = modelMapper.map(object, AdministratorEntity.class);
        entity.setId(null);
        entity.setSifra(encoder.encode(entity.getSifra()));
        entity = repository.saveAndFlush(entity);
        entityManager.refresh(entity);
        return modelMapper.map(entity, resultDtoClass);
    }
    
    @Override
    public <T, U> T update(Integer id, U object, Class<T> resultDtoClass) {
        if (!repository.existsById(id))
            throw new NotFoundException();
        AdministratorEntity entity = modelMapper.map(object, AdministratorEntity.class);
        entity.setId(id);
        entity.setSifra(encoder.encode(entity.getSifra()));
        entity = repository.saveAndFlush(entity);
        entityManager.refresh(entity);
        return modelMapper.map(entity, resultDtoClass);
    }
}
