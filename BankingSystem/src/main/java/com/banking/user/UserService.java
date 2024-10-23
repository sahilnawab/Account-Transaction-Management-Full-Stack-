package com.banking.user;

import com.banking.account.Account;
import com.banking.account.AccountRepository;
import com.banking.exception.UserNotFoundException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public UserResponse toUserResponse(User user) {
		return new UserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
	}




	public UserResponse getUserById(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
		return  toUserResponse(user);

	}

	public UserResponse updateUser(UserModel usermodel, Authentication loggedInUser) {
		User user = userRepository.findByEmail(loggedInUser.getName()).orElseThrow(() -> new UserNotFoundException("User not found"));
		user.setFirstname(usermodel.getFirstName());
		user.setLastname(usermodel.getLastName());
		user.setEmail(usermodel.getEmail());
		user.setPassword(usermodel.getPassword());
		User saved = userRepository.save(user);
		return toUserResponse(saved);
	}

	public void deleteUser(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
		userRepository.delete(user);
	}

	public List<UserResponse> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().map(this::toUserResponse).collect(Collectors.toList());
	}

	public UserResponse getAuthenticatedUser(Authentication authentication) {
		try{
			return toUserResponse(userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UserNotFoundException("User not found")));
		}catch (ExpiredJwtException eje){
			eje.printStackTrace();
		}catch (Exception e){
			e.printStackTrace();
		}
		return null;
	}
}
	
	

