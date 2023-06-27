package learn.gamer.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // "Catch all" handler

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {

        return new ResponseEntity<>(
                new ErrorResponse("Sorry, but our princess is in another castle..."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
