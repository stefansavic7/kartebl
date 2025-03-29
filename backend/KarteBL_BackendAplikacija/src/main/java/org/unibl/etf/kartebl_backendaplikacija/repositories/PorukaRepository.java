package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.PorukaEntity;

import java.util.List;

@Repository
public interface PorukaRepository  extends JpaRepository<PorukaEntity, Integer> {
    List<PorukaEntity> findAllByEmailPosiljaocaAndEmailPrimaoca(String emailPosiljaoca, String emailPrimaoca);

    @Modifying
    @Query("UPDATE PorukaEntity p SET p.procitana = true WHERE p.id = :id")
    int setBooleanColumnToTrue(@Param("id") Long id);
}
