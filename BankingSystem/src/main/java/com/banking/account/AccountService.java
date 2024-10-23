package com.banking.account;

import com.banking.exception.AccountNotFoundException;
import com.banking.exception.UserNotFoundException;
import com.banking.transaction.TransactionReposatory;
import com.banking.user.User;
import com.banking.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountReposatory;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionReposatory transactionReposatory;

    private Logger logger= Logger.getLogger(AccountService.class.getName());

    public AccountResponse ToAccountResponse(Account account){
        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setAccountId(account.getAccountId());
        accountResponse.setUserId(account.getUser().getId());
        accountResponse.setAccountType(account.getAccountType());
        accountResponse.setBalance(account.getBalance());
        accountResponse.setAccountNumber(account.getAccountNumber());
        return accountResponse;
    }


    public AccountResponse createAccount(AccountModel accountModel, Authentication loggedInUser) {
        User user = userRepository.findByEmail(loggedInUser.getName()).orElseThrow(() -> new UserNotFoundException("User not found"));
        Account account = new Account();
        account.setAccountType(accountModel.getAccountType());
        account.setBalance(accountModel.getBalance());
        account.setAccountNumber(accountModel.getAccountNumber());
        account.setUser(user);
        user.getAccounts().add(account);
        Account saved = accountReposatory.save(account);
        return ToAccountResponse(saved);
    }

    public List<AccountResponse> getAccountListOfLoggedInUser(Authentication loggedInUser) {
        User user = userRepository.findByEmail(loggedInUser.getName()).orElseThrow(() -> new UserNotFoundException("User not found"));
        Set<Account> accounts = user.getAccounts();
        List<Account> accountsList = new ArrayList<>(accounts);
        return accountsList.stream().map(this::ToAccountResponse).collect(Collectors.toList());
    }

    public AccountResponse getAccountByUserId(Long accountId,Authentication loggedInUser) {
        User user = userRepository.findByEmail(loggedInUser.getName()).orElseThrow(() -> new UserNotFoundException("User not found"));
        Set<Account> accounts= user.getAccounts();
       Account accountFound= accounts
                .stream()
                .filter((account)->account
                        .getAccountId()         //getAccountId() is a method in Account class which returns accountId
                        .equals(accountId))     //equals() is a method in Long class which compares the value of two Long objects
                        .findFirst()            //findFirst() is a method in Stream interface which returns an Optional instance
                        .orElseThrow(()->new AccountNotFoundException("Account not found"));
        return ToAccountResponse(accountFound);

    }

    @Transactional
    public void deleteAccount(Long accountId, Authentication loggedInUser) {
        User user = userRepository.findByEmail(loggedInUser.getName()).orElseThrow(() -> new UserNotFoundException("User not found"));
        Set<Account> accounts = user.getAccounts();
       Account accountFound= accounts
                .stream()
                .filter((account)->account
                        .getAccountId()
                        .equals(accountId))
                        .findFirst()
                        .orElseThrow(()->new AccountNotFoundException("Account not found"));
    var isRemoved=accounts.remove(accountFound);
    if(isRemoved){
        accountReposatory.saveAll(accounts);
    }




    }
}
