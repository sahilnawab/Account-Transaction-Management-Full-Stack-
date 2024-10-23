package com.banking.user;

import com.banking.account.AccountType;
import com.banking.transaction.Transaction;
import lombok.*;

import java.util.ArrayList;

import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {


	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Double balance;
	private AccountType accountType;
	private String AccountNumber;
	private Role role;


}
