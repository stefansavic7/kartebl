package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.PorukaEntity;
import org.unibl.etf.kartebl_backendaplikacija.repositories.PorukaRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.PorukaService;

import java.util.List;

@Service
public class PorukaServiceImpl extends CrudJpaService<PorukaEntity, Integer> implements PorukaService {

    PorukaRepository porukaRepository;
    public PorukaServiceImpl(PorukaRepository repopository, ModelMapper modelMapper) {
        super(repopository, modelMapper, PorukaEntity.class);
        this.porukaRepository = repopository;
    }

    @Override
    public List<PorukaEntity> vratiPoruke(String emailPosiljaoca, String emailPrimaoca) {
        return porukaRepository.findAllByEmailPosiljaocaAndEmailPrimaoca(emailPosiljaoca, emailPrimaoca);
    }
}
