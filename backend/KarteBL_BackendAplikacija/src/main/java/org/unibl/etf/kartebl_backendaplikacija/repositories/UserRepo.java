package org.unibl.etf.kartebl_backendaplikacija.repositories;

import org.unibl.etf.kartebl_backendaplikacija.models.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer>
{
    Users findByEmail(String email);
}
