package org.unibl.etf.kartebl_backendaplikacija.repositories;

import jakarta.persistence.OneToMany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.DogadjajEntity;

@Repository
public interface DogadjajRepository extends JpaRepository<DogadjajEntity, Integer> {
}
