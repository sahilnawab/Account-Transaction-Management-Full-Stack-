package com.banking.user;

import com.banking.account.Account;
import com.banking.account.AccountType;
import com.banking.transaction.Transaction;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponse {


    private long id;
    private String fullName;
    private String email;
    private Role role;
    }
