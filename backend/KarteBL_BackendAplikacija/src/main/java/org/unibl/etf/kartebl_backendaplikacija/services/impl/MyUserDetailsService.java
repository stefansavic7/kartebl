package org.unibl.etf.kartebl_backendaplikacija.services.impl;

import org.unibl.etf.kartebl_backendaplikacija.models.dto.UserPrincipal;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.Users;
import org.unibl.etf.kartebl_backendaplikacija.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService
{
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
    {
        Users user = userRepo.findByEmail(email);
        if(user == null)
        {
            System.out.println("User not found!");
            throw new UsernameNotFoundException("User not found!");
        }
        return new UserPrincipal(user);
    }
}
