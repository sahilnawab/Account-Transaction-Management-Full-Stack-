package com.banking.account;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AccountResponse {

    private Long accountId;
    private Long userId;
    private AccountType accountType;
    private Double balance;
    private String accountNumber;
    private String openDate;





}
