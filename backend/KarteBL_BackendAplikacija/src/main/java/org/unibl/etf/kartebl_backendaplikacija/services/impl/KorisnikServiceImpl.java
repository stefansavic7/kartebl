package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.KorisnikRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.KorisnikService;

@Service
@Transactional
public class KorisnikServiceImpl extends CrudJpaService<KorisnikEntity, Integer> implements KorisnikService
{
    public KorisnikServiceImpl(KorisnikRepository korisnikRepository, ModelMapper modelMapper)
    {
        super(korisnikRepository, modelMapper, KorisnikEntity.class);
    }
}
