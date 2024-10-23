package com.banking.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionReposatory extends JpaRepository<Transaction, Long> {
}
