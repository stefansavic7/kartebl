package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudJpaService;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.NotFoundException;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.request.DogadjajRequest;
import org.unibl.etf.kartebl_backendaplikacija.repositories.DogadjajRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.DogadjajService;

@Service
public class DogadjajServiceImpl extends CrudJpaService<DogadjajEntity, Integer> implements DogadjajService
{
    @Autowired
    DogadjajRepository dogadjajRepository;
    @Autowired
    ModelMapper modelMapper;
    public DogadjajServiceImpl(DogadjajRepository dogadjajRepository, ModelMapper modelMapper) {
        super(dogadjajRepository,modelMapper, DogadjajEntity.class);

    }


    public DogadjajDto insertWithPicture(DogadjajRequest podaci, MultipartFile slika)
    {

        DogadjajEntity dogadjaj = new DogadjajEntity();
        dogadjaj.setDatum(podaci.getDatum());
        dogadjaj.setNaziv(podaci.getNaziv());
        dogadjaj.setVrijeme(podaci.getVrijeme());
        dogadjaj.setLokacija(podaci.getLokacija());
        dogadjaj.setOpis(podaci.getOpis());
        AdministratorEntity administratorEntity = new AdministratorEntity();
        administratorEntity.setId(podaci.getAdministratorId());
        dogadjaj.setAdministrator(administratorEntity);
        OrganizatorEntity organizatorEntity = new OrganizatorEntity();
        organizatorEntity.setId(podaci.getOrganizatorId());
        dogadjaj.setOrganizator(organizatorEntity);
        dogadjaj.setOdobren(false);
        dogadjaj.setTipSlike(slika.getContentType());
        try {
            byte[] slikaFile = slika.getBytes();
            dogadjaj.setSlika(slikaFile);
            dogadjaj=dogadjajRepository.saveAndFlush(dogadjaj);
            DogadjajDto response = new DogadjajDto();
            modelMapper.map(dogadjaj, response);
            return response;


        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    public DogadjajDto update( Integer id,  DogadjajRequest podaci,  MultipartFile slika)
    {
        if (!dogadjajRepository.existsById(id))
            throw new NotFoundException();

        DogadjajEntity dogadjaj = new DogadjajEntity();
        dogadjaj.setId(id);
        dogadjaj.setDatum(podaci.getDatum());
        dogadjaj.setNaziv(podaci.getNaziv());
        dogadjaj.setVrijeme(podaci.getVrijeme());
        dogadjaj.setLokacija(podaci.getLokacija());
        dogadjaj.setOpis(podaci.getOpis());
        AdministratorEntity administratorEntity = new AdministratorEntity();
        administratorEntity.setId(podaci.getAdministratorId());
        dogadjaj.setAdministrator(administratorEntity);
        OrganizatorEntity organizatorEntity = new OrganizatorEntity();
        organizatorEntity.setId(podaci.getOrganizatorId());
        dogadjaj.setOrganizator(organizatorEntity);
        dogadjaj.setOdobren(false);
        dogadjaj.setTipSlike(slika.getContentType());
        try {
            byte[] slikaFile = slika.getBytes();
            dogadjaj.setSlika(slikaFile);
            dogadjaj=dogadjajRepository.saveAndFlush(dogadjaj);
            DogadjajDto response = new DogadjajDto();
            modelMapper.map(dogadjaj, response);
            return response;


        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }



}
