package com.surgealert.controller;

import com.surgealert.config.JwtUtils;
import com.surgealert.dto.LoginRequest;
import com.surgealert.dto.LoginResponse;
import com.surgealert.dto.RegisterRequest;
import com.surgealert.entity.User;
import com.surgealert.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils; // We use this to sign the token

    public AuthController(UserService userService, 
                          AuthenticationManager authenticationManager, 
                          JwtUtils jwtUtils) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword()); // UserService handles encoding
            user.setFullName(request.getFullName());
            
            // Default to ADMIN if not specified, or use request role
            user.setRole(request.getRole() != null ? request.getRole() : "ADMIN");
            
            userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // 1. Verify Email and Password using Spring Security
            // If password is wrong, this line throws an exception automatically
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // 2. If we get here, password is correct. Get the User entity.
            User user = userService.findByEmail(request.getEmail());
            
            // 3. Create a UserDetails object required by JwtUtils
            // We map our Entity -> Spring Security UserDetails
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword()) // Encoded password
                    .roles(user.getRole())
                    .build();

            // 4. Generate the Real JWT
            String token = jwtUtils.generateToken(userDetails);
            
            // 5. Return the response
            LoginResponse response = new LoginResponse(
                    token,
                    user.getEmail(),
                    user.getFullName(),
                    user.getRole()
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // This catches BadCredentialsException if password is wrong
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}