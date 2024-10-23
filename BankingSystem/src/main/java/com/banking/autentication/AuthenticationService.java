package com.banking.autentication;

import com.banking.account.Account;
import com.banking.jwt.JwtService;
import com.banking.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public UserResponse createUser(UserModel usermodel) {
        User user = new User();
        Account account = new Account();
        account.setAccountNumber(usermodel.getAccountNumber());
        account.setAccountType(usermodel.getAccountType());
        account.setBalance(usermodel.getBalance());
        user.setFirstname(usermodel.getFirstName());
        user.setLastname(usermodel.getLastName());
        user.setEmail(usermodel.getEmail());
        user.setPassword(passEncoder.encode(usermodel.getPassword()));
        user.setRole(usermodel.getRole());
        account.setUser(user);
        user.getAccounts().add(account);
        User saved = userRepository.save(user);
        return userService.toUserResponse(saved);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var claims=new HashMap<String,Object>();
        User user=(User) authentication.getPrincipal();
        claims.put("userName",user.getName());
        String token= jwtService.generateToken(claims,user);
       if(token==null || token==""){
           throw new BadCredentialsException("Invalid credentials");
       }else
        return new AuthenticationResponse(token);
    }
}
