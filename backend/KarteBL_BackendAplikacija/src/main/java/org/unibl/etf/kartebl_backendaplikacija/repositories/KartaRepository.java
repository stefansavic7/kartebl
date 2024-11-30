package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;

@Repository
public interface KartaRepository extends JpaRepository<KartaEntity, Integer> {
}
