package org.unibl.etf.kartebl_backendaplikacija.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority
{
    administrator,
    organizator,
    korisnik;
    
    @Override
    public String getAuthority()
    {
        return this.name();
    }
}
