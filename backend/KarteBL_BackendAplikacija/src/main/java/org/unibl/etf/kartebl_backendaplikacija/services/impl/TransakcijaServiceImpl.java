package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.TransakcijaRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.TransakcijaService;

@Service
@Transactional
public class TransakcijaServiceImpl extends CrudJpaService<TransakcijaEntity, Integer> implements TransakcijaService
{
    public TransakcijaServiceImpl(TransakcijaRepository transakcijaRepository, ModelMapper modelMapper)
    {
        super(transakcijaRepository, modelMapper, TransakcijaEntity.class);
    }
}
