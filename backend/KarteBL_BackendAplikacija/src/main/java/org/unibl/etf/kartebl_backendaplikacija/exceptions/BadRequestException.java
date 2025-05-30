package org.unibl.etf.kartebl_backendaplikacija.exceptions;

import org.springframework.http.HttpStatus;

public class BadRequestException extends HttpException {

    public BadRequestException() {
        super(HttpStatus.BAD_REQUEST, null);
    }


    public BadRequestException(Object data) {
        super(HttpStatus.BAD_REQUEST, data);
    }
    public BadRequestException(HttpStatus status, String message) {
        super(status, message);
    }
}
