package org.unibl.etf.kartebl_backendaplikacija.services;

import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.base.CrudService;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.PorukaEntity;

import java.util.List;


public interface PorukaService extends CrudService<Integer> {
    List<PorukaEntity> vratiPoruke(String emailPosiljaoca, String emailPrimaoca);
    void setPorukaProcitana_true(Integer idPoruke);
}
