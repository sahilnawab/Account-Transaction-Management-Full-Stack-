package com.banking.exception;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(String accountNotFound) {
        super(accountNotFound);
    }
}
