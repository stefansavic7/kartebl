package org.unibl.etf.kartebl_backendaplikacija.models.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KorisnikEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.SkeniranaKartaEntity;

@Data
public class TransakcijaRequest
{
    private Integer korisnikId;
    private Integer kartaId;

}
