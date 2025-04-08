package org.unibl.etf.kartebl_backendaplikacija.services;

import org.unibl.etf.kartebl_backendaplikacija.base.CrudService;
import org.unibl.etf.kartebl_backendaplikacija.models.dto.TransakcijaDto;
import org.unibl.etf.kartebl_backendaplikacija.models.request.TransakcijaRequest;

public interface TransakcijaService extends CrudService<Integer> {
    TransakcijaDto generate(TransakcijaRequest transakcijaRequest) throws Exception;
}
