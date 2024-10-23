package com.banking.autentication;

import com.banking.user.User;
import com.banking.user.UserModel;
import com.banking.user.UserResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
//@CrossOrigin("http://localhost:5173")
@Tag(name = "Authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/createuser")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserModel usermodel) {
        UserResponse userResponse = authenticationService.createUser(usermodel);
        return ResponseEntity.ok(userResponse);
    }




    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        var response = authenticationService.authenticate(request);
        if (response != null) return ResponseEntity.ok(response);
        else return ResponseEntity.badRequest().body("Invalid credentials");
    }
}