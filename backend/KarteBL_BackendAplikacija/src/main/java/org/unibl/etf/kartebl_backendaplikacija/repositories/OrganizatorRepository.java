package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleOrganizatorDto;

@Repository
public interface OrganizatorRepository extends JpaRepository<OrganizatorEntity, Integer> {
    OrganizatorEntity findByEmail(String email);
}
