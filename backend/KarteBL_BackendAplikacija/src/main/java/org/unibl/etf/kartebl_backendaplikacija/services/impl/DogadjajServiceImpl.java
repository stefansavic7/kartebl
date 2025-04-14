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
import org.unibl.etf.kartebl_backendaplikacija.models.dto.TransakcijaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.*;
import org.unibl.etf.kartebl_backendaplikacija.models.request.DogadjajRequest;
import org.unibl.etf.kartebl_backendaplikacija.repositories.DogadjajRepository;
import org.unibl.etf.kartebl_backendaplikacija.services.DogadjajService;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

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
        dogadjaj.setOdobren(podaci.getOdobren());
        dogadjaj.setTipSlike(slika.getContentType());
        try {
            byte[] slikaFile = slika.getBytes();
            dogadjaj=dogadjajRepository.saveAndFlush(dogadjaj);
            String ekstenzija="";
            if(slika.getContentType().equals("image/jpeg"))
                ekstenzija=".jpg";
            else ekstenzija=".png";
            dogadjaj.setPutanjaDoSlike("KarteBL_BackendAplikacija\\src\\main\\resources\\Slike\\"+dogadjaj.getId()+ekstenzija);
            try{
                FileOutputStream fileOutputStream=new FileOutputStream(dogadjaj.getPutanjaDoSlike());
                fileOutputStream.write(slikaFile,0,slikaFile.length);
            } catch (Exception e) {
                e.printStackTrace();
            }
            dogadjajRepository.save(dogadjaj);
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
        dogadjaj.setOdobren(podaci.getOdobren());
        dogadjaj.setTipSlike(slika.getContentType());
        String ekstenzija="";
        if (slika.getContentType().equals("image/jpeg"))
            ekstenzija=".jpg";
        else ekstenzija=".png";
        try {
            byte[] slikaFile = slika.getBytes();
            dogadjaj=dogadjajRepository.saveAndFlush(dogadjaj);
            dogadjaj.setPutanjaDoSlike("KarteBL_BackendAplikacija\\src\\main\\resources\\Slike\\"+dogadjaj.getId()+ekstenzija);
            dogadjajRepository.save(dogadjaj);
            FileOutputStream fileOutputStream=new FileOutputStream(dogadjaj.getPutanjaDoSlike());
            fileOutputStream.write( slikaFile,0,slikaFile.length);

            DogadjajDto response = new DogadjajDto();
            modelMapper.map(dogadjaj, response);
            return response;


        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public List<TransakcijaDto> getTransakcijeZaDogadjaj(Integer id) {
        DogadjajEntity dogadjaj = dogadjajRepository.findById(id).orElseThrow(()->new NotFoundException("Dogadjaj sa id-em "+id+" ne postoji."));
        List<KartaEntity> kartaEntities=dogadjaj.getKarte();
        List<TransakcijaDto> transakcije=new ArrayList<>();

        for (KartaEntity karta:kartaEntities)
        {
            List<TransakcijaDto> pomocnaLista=new ArrayList<>();
            pomocnaLista=gettransakcijeZaVrstuKarte(karta.getId());
            for (TransakcijaDto transakcijaDto:pomocnaLista)
                transakcije.add(transakcijaDto);
        }
        return transakcije;

    }

    @Override
    public List<TransakcijaDto> gettransakcijeZaVrstuKarte(Integer idKarte) {

        List<TransakcijaEntity> transakcijaEntities=dogadjajRepository.getAllTransakcijaEntityByKarta(idKarte);
        List<TransakcijaDto> transakcijaDtos=new ArrayList<>();
        for (TransakcijaEntity transakcijaEntity : transakcijaEntities) {
            TransakcijaDto transakcijaDto=modelMapper.map(transakcijaEntity, TransakcijaDto.class);
            transakcijaDtos.add(transakcijaDto);
        }
        return transakcijaDtos;
    }


}
