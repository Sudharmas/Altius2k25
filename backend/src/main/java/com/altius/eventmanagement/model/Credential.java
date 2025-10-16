package com.altius.eventmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "CREDENTIALS")
public class Credential {
    
    @Id
    private String id;
    
    private String username; // USN
    private String password;
    private String role; // ADMIN or ADMINISTRATOR
    
}
