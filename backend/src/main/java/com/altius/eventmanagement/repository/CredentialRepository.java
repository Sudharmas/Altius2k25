package com.altius.eventmanagement.repository;

import com.altius.eventmanagement.model.Credential;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CredentialRepository extends MongoRepository<Credential, String> {
    Optional<Credential> findByUsername(String username);
}
