package org.unibl.etf.kartebl_backendaplikacija.advices;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.HandlerMethod;
import org.unibl.etf.kartebl_backendaplikacija.exceptions.HttpException;

@ControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public final ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException e, HandlerMethod handlerMethod)
    {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(HttpException.class)
    public final ResponseEntity<Object> handleHttpException(HttpException e, HandlerMethod handlerMethod)
    {
        if(e.getStatus() == null)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(e.getData(), e.getStatus());
    }
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleException(Exception e, HandlerMethod handlerMethod)
    {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
