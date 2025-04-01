package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.TransakcijaEntity;

import java.util.List;

@Repository
public interface TransakcijaRepository extends JpaRepository<TransakcijaEntity, Integer>
{
    @Query("SELECT t.qr FROM TransakcijaEntity t")
    List<String> findAllQRCodes();
}
