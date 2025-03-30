package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;

import java.util.List;

@Repository
public interface DogadjajRepository extends JpaRepository<DogadjajEntity, Integer> {

    @Query("SELECT t FROM TransakcijaEntity t where t.karta.id= :idKarte")
    List<TransakcijaEntity> getAllTransakcijaEntityByKarta(@Param(value = "idKarte") Integer idKarte);
}
