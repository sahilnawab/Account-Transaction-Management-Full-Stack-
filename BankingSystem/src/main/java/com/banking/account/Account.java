package com.banking.account;

import com.banking.transaction.Transaction;
import com.banking.user.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.List;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)//This annotation is used to automatically populate the created_at and updated_at fields
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //this field will be filed automatically when the user is created from entity listener
    @CreatedDate
    private LocalDate    createdAt;

    //this field will be filed automatically when the user is updated from entity listener
    @LastModifiedDate
    private LocalDate updatedAt;

    @Column(nullable = false)
    private String accountNumber;

    // One account can have multiple transactions and transaction table will have a foreign key of account table
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Transaction> transactions=new ArrayList<>();

    private Double balance;
    @Enumerated(EnumType.STRING)

    private AccountType accountType;


}