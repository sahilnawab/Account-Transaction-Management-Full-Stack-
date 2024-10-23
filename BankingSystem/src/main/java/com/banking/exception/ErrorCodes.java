package com.banking.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor

public enum ErrorCodes {

                INTERNAL_SERVER_ERROR("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
                BAD_CREDETIALS("BAD_CREDENTIALS", HttpStatus.BAD_REQUEST, "username or password incorrect"),
                USER_NOT_FOUND("USER_NOT_FOUND", HttpStatus.NOT_FOUND, "User not found"),
                ACCOUNT_NOT_FOUND("ACCOUNT_NOT_FOUND", HttpStatus.NOT_FOUND, "Account not found"),
                INSUFFICIENT_BALANCE("INSUFFICIENT_BALANCE", HttpStatus.BAD_REQUEST, "Insufficient balance"),
                INVALID_ACCOUNT_TYPE("INVALID_ACCOUNT_TYPE", HttpStatus.BAD_REQUEST, "Invalid account type"),
                INVALID_TRANSACTION_TYPE("INVALID_TRANSACTION_TYPE", HttpStatus.BAD_REQUEST, "Invalid transaction type"),
                INVALID_TRANSACTION_AMOUNT("INVALID_TRANSACTION_AMOUNT", HttpStatus.BAD_REQUEST, "Invalid transaction amount"),
                INVALID_TRANSACTION("INVALID_TRANSACTION", HttpStatus.BAD_REQUEST, "Invalid transaction"),
                INVALID_USER("INVALID_USER", HttpStatus.BAD_REQUEST, "Invalid user"),
                INVALID_ACCOUNT("INVALID_ACCOUNT", HttpStatus.BAD_REQUEST, "Invalid account"),
                INVALID_USER_ID("INVALID_USER_ID", HttpStatus.BAD_REQUEST, "Invalid user ID"),
                INVALID_ACCOUNT_ID("INVALID_ACCOUNT_ID", HttpStatus.BAD_REQUEST, "Invalid account ID"),
                INVALID_TRANSACTION_ID("INVALID_TRANSACTION_ID", HttpStatus.BAD_REQUEST, "Invalid transaction ID"),
                INVALID_TRANSACTION_DATE("INVALID_TRANSACTION_DATE", HttpStatus.BAD_REQUEST, "Invalid transaction date"),
                INVALID_TRANSACTION_STATUS("INVALID_TRANSACTION_STATUS", HttpStatus.BAD_REQUEST, "Invalid transaction status"),
                INVALID_TRANSACTION_DESCRIPTION("INVALID_TRANSACTION_DESCRIPTION", HttpStatus.BAD_REQUEST, "Invalid transaction description"),
                INVALID_TRANSACTION_ACCOUNT("INVALID_TRANSACTION_ACCOUNT", HttpStatus.BAD_REQUEST, "Invalid transaction account"),
                INVALID_TRANSACTION_AMOUNT_TYPE("INVALID_TRANSACTION_AMOUNT_TYPE", HttpStatus.BAD_REQUEST, "Invalid transaction amount type"),
                INVALID_TRANSACTION_AMOUNT_VALUE("INVALID_TRANSACTION_AMOUNT_VALUE", HttpStatus.BAD_REQUEST, "Invalid transaction amount value"),
                INVALID_TRANSACTION_ACCOUNT_ID("INVALID_TRANSACTION_ACCOUNT_ID", HttpStatus.BAD_REQUEST, "Invalid transaction account ID"),
                INVALID_TRANSACTION_USER_ID("INVALID_TRANSACTION_USER_ID", HttpStatus.BAD_REQUEST, "Invalid transaction user ID"),
                INVALID_TRANSACTION_ACCOUNT_BALANCE("INVALID_TRANSACTION_ACCOUNT_BALANCE", HttpStatus.BAD_REQUEST, "Invalid transaction account balance"),
                INVALID_TRANSACTION_ACCOUNT_TYPE("INVALID_TRANSACTION_ACCOUNT_TYPE", HttpStatus.BAD_REQUEST, "Invalid transaction account type"),
                INVALID_TRANSACTION_ACCOUNT_NUMBER("INVALID_TRANSACTION_ACCOUNT_NUMBER", HttpStatus.BAD_REQUEST, "Invalid transaction account number"),
                INVALID_TRANSACTION_ACCOUNT_STATUS("INVALID_TRANSACTION_ACCOUNT_STATUS", HttpStatus.BAD_REQUEST, "Invalid transaction account status"),
                INVALID_TRANSACTION_ACCOUNT_DESCRIPTION("INVALID_TRANSACTION_ACCOUNT_DESCRIPTION", HttpStatus.BAD_REQUEST, "Invalid transaction account description"),
                INVALID_TRANSACTION_ACCOUNT_DATE("INVALID_TRANSACTION_ACCOUNT_DATE", HttpStatus.BAD_REQUEST, "Invalid transaction account date"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION("INVALID_TRANSACTION_ACCOUNT_TRANSACTION", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction"),
                INVALID_TRANSACTION_ACCOUNT_AMOUNT("INVALID_TRANSACTION_ACCOUNT_AMOUNT", HttpStatus.BAD_REQUEST, "Invalid transaction account amount"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_TYPE("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_TYPE", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction type"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_STATUS("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_STATUS", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction status"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_DESCRIPTION("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_DESCRIPTION", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction description"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_DATE("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_DATE", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction date"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_AMOUNT("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_AMOUNT", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction amount"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_USER("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_USER", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction user"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_BALANCE("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_BALANCE", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction balance"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_TYPE("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_TYPE", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account type"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_NUMBER("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_NUMBER", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account number"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_STATUS("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_STATUS", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account status"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_DESCRIPTION("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_DESCRIPTION", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account description"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_DATE("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_DATE", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account date"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_TRANSACTION("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_TRANSACTION", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account transaction"),
                INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_AMOUNT("INVALID_TRANSACTION_ACCOUNT_TRANSACTION_ACCOUNT_AMOUNT", HttpStatus.BAD_REQUEST, "Invalid transaction account transaction account amount");


    private String code;
    private HttpStatus httpStatus;
    private String message;


}

