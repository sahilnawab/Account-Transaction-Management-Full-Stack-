package com.banking.account;


import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AccountModel {


    private String accountNumber;
    private AccountType accountType;
    private Double balance;

}
