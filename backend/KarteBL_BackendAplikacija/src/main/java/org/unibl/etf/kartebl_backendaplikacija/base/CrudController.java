package org.unibl.etf.kartebl_backendaplikacija.base;

import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.NotFoundException;



import java.io.Serializable;
import java.util.List;

@Getter
public abstract class CrudController<ID, REQ, RESP,SINGLERESP> {

    private final Class<RESP> respClass;
    private final Class<SINGLERESP> singleRespClass;
    private final CrudService<ID> crudService;

    public CrudController(CrudService<ID> crudService, Class<RESP> respClass, Class<SINGLERESP> singleRespClass) {
        this.crudService = crudService;
        this.respClass = respClass;
        this.singleRespClass = singleRespClass;
    }

    @GetMapping
    List<RESP> findAll() {
        return crudService.findAll(respClass);
    }

    @GetMapping("/{id}")
    public SINGLERESP findById(@PathVariable ID id) throws NotFoundException {
        return crudService.findById(id, singleRespClass);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable ID id) {
        crudService.delete(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RESP insert(@RequestBody @Valid REQ object) throws NotFoundException {
        return crudService.insert(object, respClass);
    }

    @PutMapping("/{id}")
    public RESP update(@PathVariable ID id, @RequestBody @Valid REQ object) throws NotFoundException {
        return crudService.update(id, object, respClass);
    }
}
