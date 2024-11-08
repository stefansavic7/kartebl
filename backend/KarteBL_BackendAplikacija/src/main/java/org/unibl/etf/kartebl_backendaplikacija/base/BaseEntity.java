package org.unibl.etf.kartebl_backendaplikacija.base;

import java.io.Serializable;

public interface BaseEntity<ID> {
    ID getId();

    void setId(ID id);
}
