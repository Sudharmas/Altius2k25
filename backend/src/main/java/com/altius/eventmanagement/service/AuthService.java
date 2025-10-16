package com.altius.eventmanagement.service;

import com.altius.eventmanagement.dto.LoginRequest;
import com.altius.eventmanagement.dto.LoginResponse;
import com.altius.eventmanagement.model.Credential;
import com.altius.eventmanagement.repository.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private CredentialRepository credentialRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;  // Add this
    
    public LoginResponse login(LoginRequest request) {
        Optional<Credential> credentialOpt = credentialRepository.findByUsername(request.getUsername());
        
        if (credentialOpt.isPresent()) {
            Credential credential = credentialOpt.get();
            if (passwordEncoder.matches(request.getPassword(), credential.getPassword())) {  // Use encoder
                return new LoginResponse(true, "Login successful", 
                    credential.getUsername(), credential.getRole());
            }
        }
        
        return new LoginResponse(false, "Invalid username or password", null, null);
    }
}
