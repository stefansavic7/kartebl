package org.unibl.etf.kartebl_backendaplikacija.services;

import org.unibl.etf.kartebl_backendaplikacija.base.CrudService;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.KartaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.KartaRequest;

public interface KartaService extends CrudService<Integer> {

    public KartaDto updateKarta(KartaRequest kartaRequest, int kartaId)throws Exception;
}
