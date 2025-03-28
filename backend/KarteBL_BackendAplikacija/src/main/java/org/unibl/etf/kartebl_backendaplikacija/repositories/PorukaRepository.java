package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.PorukaEntity;

import java.util.List;

@Repository
public interface PorukaRepository  extends JpaRepository<PorukaEntity, Integer> {
    List<PorukaEntity> findAllByEmailPosiljaocaAndEmailPrimaoca(String emailPosiljaoca, String emailPrimaoca);
}
