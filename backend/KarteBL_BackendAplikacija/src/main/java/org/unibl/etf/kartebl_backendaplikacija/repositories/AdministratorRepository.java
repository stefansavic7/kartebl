package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;

@Repository
public interface AdministratorRepository extends JpaRepository<AdministratorEntity, Integer> {
}
