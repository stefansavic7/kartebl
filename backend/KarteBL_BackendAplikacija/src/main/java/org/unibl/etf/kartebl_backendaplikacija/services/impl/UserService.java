package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.unibl.etf.kartebl_backendaplikacija.enums.Role;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.ConflictException;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.Users;
import org.unibl.etf.kartebl_backendaplikacija.repositories.KorisnikRepository;
import org.unibl.etf.kartebl_backendaplikacija.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.ConflictException;

import java.util.Optional;

@Service
public class UserService
{
    @Autowired
    UserRepo userRepo;
    @Autowired
    KorisnikRepository korisnikRepository;
    @Autowired
    JWTService jwtService;
    @Autowired
    AuthenticationManager authManager;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    public Users register(Users user)
    {
        user.setPassword(encoder.encode(user.getPassword()));
        
        //TODO: sacuvaj ga u tabeli korisnik
    
        Users existingUser = userRepo.findByEmail(user.getEmail());
    
        if (existingUser == null) {
            KorisnikEntity korisnikEntity = new KorisnikEntity(user);
            korisnikEntity = korisnikRepository.save(korisnikEntity);
            Users registeredUser = new Users(korisnikEntity);
            registeredUser.setTip(String.valueOf(Role.korisnik));
            return registeredUser;
        } else {
            throw new ConflictException("Korisnik sa ovim email-om već postoji!");
        }
    }
    
    public String verify(Users user)
    {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getEmail());
        return "Fail";
    }
}
