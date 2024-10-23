package com.banking.exception;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY) // this will exclude null fields from the response
public class ExceptionResponse {

    private String message;
    private String errorCode;
    private String error;
//    private Set<String> validationErrors;
    private Map<String, String> errors;


}
