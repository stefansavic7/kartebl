package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.server.ResponseStatusException;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.BadRequestException;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.KartaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.request.KartaRequest;
import org.unibl.etf.kartebl_backendaplikacija.repositories.DogadjajRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.KartaRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.OrganizatorRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.KartaService;

@Service
public class KartaServiceImpl extends CrudJpaService<KartaEntity, Integer> implements KartaService
{


    private final KartaRepository kartaRepository;
    public KartaRepository repository;
    private ModelMapper modelMapper;
    DogadjajRepository dogadjajRepository;
    OrganizatorRepository organizatorRepository;

    public KartaServiceImpl(KartaRepository repository, ModelMapper modelMapper, DogadjajRepository dogadjajRepository, OrganizatorRepository organizatorRepository, KartaRepository kartaRepository) {
        super(repository, modelMapper, KartaEntity.class);
        this.dogadjajRepository = dogadjajRepository;
        this.organizatorRepository = organizatorRepository;
        this.kartaRepository = kartaRepository;
        this.modelMapper = modelMapper;
    }

    public KartaDto updateKarta(KartaRequest kartaRequest, int kartaId)throws Exception {
        int brojProdatihKarata= kartaRepository.getBrojProdatihKarata(kartaId);
        if (brojProdatihKarata>kartaRequest.getMaxBrojKarata())
            throw new BadRequestException("Maksimalan broj karata ne smije biti manji od trenutnog broja prodatih karata!");
        KartaEntity kartaEntity = modelMapper.map(kartaRequest, KartaEntity.class);
        kartaEntity.setId(kartaId);
        kartaEntity.setBrojProdatihKarata(brojProdatihKarata);
        KartaDto dto=modelMapper.map(kartaRepository.save(kartaEntity), KartaDto.class);
        return dto;
    }


}
