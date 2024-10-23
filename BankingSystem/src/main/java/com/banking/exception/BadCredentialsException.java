package com.banking.exception;

public class BadCredentialsException extends RuntimeException {
    public BadCredentialsException(String desc) {
        super(desc);
    }

}
