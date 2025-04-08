package org.unibl.etf.kartebl_backendaplikacija.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
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
    int setBooleanColumnToTrue(@Param("id") Integer id);

    @Modifying
    @Query("SELECT p FROM PorukaEntity p where p.emailPosiljaoca= :emailPosiljaoca")
    List<PorukaEntity> vratiPoslanePoruke(@Param(value = "emailPosiljaoca")String emailPosiljaoca);

    @Modifying
    @Query("SELECT p FROM PorukaEntity p where p.emailPrimaoca= :emailPrimaoca")
    List<PorukaEntity> vratiPrimljenePoruke(@Param(value = "emailPrimaoca")String emailPrimaoca);

}
