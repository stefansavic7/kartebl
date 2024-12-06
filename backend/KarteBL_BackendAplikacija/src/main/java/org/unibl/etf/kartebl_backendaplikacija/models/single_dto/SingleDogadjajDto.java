package org.unibl.etf.kartebl_backendaplikacija.models.single_dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.AdministratorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.DogadjajDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.KartaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.OrganizatorDto;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.AdministratorEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.KartaEntity;
import org.unibl.etf.kartebl_backendaplikacija.models.entities.OrganizatorEntity;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleDogadjajDto extends DogadjajDto {

    private AdministratorDto administrator;

    private OrganizatorDto organizator;

    private List<KartaDto> karte;
}
