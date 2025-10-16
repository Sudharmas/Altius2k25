package com.altius.eventmanagement.repository;

import com.altius.eventmanagement.model.EventResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventResultRepository extends MongoRepository<EventResult, String> {
    List<EventResult> findAll();
    Optional<EventResult> findByEventId(String eventId);
}
