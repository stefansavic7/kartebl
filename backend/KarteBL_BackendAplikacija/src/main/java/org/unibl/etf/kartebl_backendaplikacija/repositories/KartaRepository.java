package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;

@Repository
public interface KartaRepository extends JpaRepository<KartaEntity, Integer> {


    @Query("SELECT k.maxBrojKarata FROM KartaEntity k where k.id= :kartaId")
    Integer getMaxBrojKarata(@Param(value = "kartaId") Integer kartaId);


    @Query("SELECT k.brojProdatihKarata FROM KartaEntity k where k.id= :kartaId")
    Integer getBrojProdatihKarata(@Param(value = "kartaId") Integer kartaId);

    @Modifying
    @Transactional
    @Query("UPDATE KartaEntity k SET k.brojProdatihKarata = :brojProdatih WHERE k.id = :kartaId")
    int updateBrojProdatihKarata(@Param("kartaId") Integer kartaId,@Param("brojProdatih") Integer brojProdatih);
}
