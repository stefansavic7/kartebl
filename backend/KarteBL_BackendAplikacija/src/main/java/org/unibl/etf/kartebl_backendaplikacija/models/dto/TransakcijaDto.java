package org.unibl.etf.kartebl_backendaplikacija.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.SkeniranaKartaEntity;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
public class TransakcijaDto
{
    private Integer id;
    
    private KartaEntity idKarta;
    
}
