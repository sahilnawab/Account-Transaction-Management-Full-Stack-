package com.banking.user;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/user")
//@CrossOrigin("http://localhost:5173")
public class UserController {

	private final Logger logger = Logger.getLogger(UserController.class.getName());
	
	@Autowired
	private UserService userService;

	@GetMapping("/current-user")
	public ResponseEntity<UserResponse>getAuthenticatedUser(Authentication authentication){
		logger.info("Getting authenticated user");
		UserResponse userResponse = userService.getAuthenticatedUser(authentication);
		return ResponseEntity.ok(userResponse);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
		UserResponse userResponse = userService.getUserById(id);
		return ResponseEntity.ok(userResponse);
	}

		@GetMapping("/all-users")
		public ResponseEntity<List<UserResponse>> getAllUsers() {
			List<UserResponse> users = userService.getAllUsers();
			return ResponseEntity.ok(users);
	}

	@PatchMapping("/update")
	public ResponseEntity<UserResponse> updateUser(@RequestBody UserModel userModel, Authentication loggedInUser) {
		UserResponse userResponse = userService.updateUser(userModel, loggedInUser);
		return ResponseEntity.ok(userResponse);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return ResponseEntity.ok().build();
	}


}
