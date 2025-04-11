package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.single_dto.SingleKorisnikDto;

@Repository
public interface KorisnikRepository extends JpaRepository<KorisnikEntity, Integer>
{
    KorisnikEntity findByEmail(String email);
}
