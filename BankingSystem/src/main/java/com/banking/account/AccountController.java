package com.banking.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")


public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<AccountResponse> createAccount(@RequestBody AccountModel accountModel,Authentication loggedInUser) {
        AccountResponse accountResponse = accountService.createAccount(accountModel, loggedInUser);
       return ResponseEntity.ok(accountResponse);
    }
// get list of accounts of logged in user
    @GetMapping("/all-accounts")
    public ResponseEntity<List<AccountResponse>> getAccountListByUserId(Authentication loggedInUser) {
        List<AccountResponse> accountResponse = accountService.getAccountListOfLoggedInUser(loggedInUser);
        return ResponseEntity.ok(accountResponse);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponse> getAccountByUserId(@PathVariable Long accountId, Authentication loggedInUser) {
        AccountResponse accountResponse = accountService.getAccountByUserId(accountId, loggedInUser);
        return ResponseEntity.ok(accountResponse);
    }

    @DeleteMapping("/delete/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long accountId,Authentication loggedInUser) {
        accountService.deleteAccount(accountId,loggedInUser);
        return ResponseEntity.ok().build();
    }
}
