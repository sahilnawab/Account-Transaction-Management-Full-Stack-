package com.banking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleException(UserNotFoundException exp){
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(
                        ExceptionResponse.builder()
                                .errorCode(ErrorCodes.USER_NOT_FOUND.getCode())
                                .message(ErrorCodes.USER_NOT_FOUND.getMessage())
                                .error(exp.getMessage())
                                    .build());
    }

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleException(AccountNotFoundException exp){
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(
                        ExceptionResponse.builder()
                                .errorCode(ErrorCodes.ACCOUNT_NOT_FOUND.getCode())
                                .message(ErrorCodes.ACCOUNT_NOT_FOUND.getMessage())
                                .error(exp.getMessage())
                                .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp){
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .errorCode(exp.getLocalizedMessage())
                                .message(ErrorCodes.INTERNAL_SERVER_ERROR.getMessage())
                                .error(exp.getMessage())
                                .build());
    }


}
