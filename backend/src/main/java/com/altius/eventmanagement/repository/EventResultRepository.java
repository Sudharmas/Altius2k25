package com.altius.eventmanagement.repository;

import com.altius.eventmanagement.model.EventResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventResultRepository extends JpaRepository<EventResult, Long> {
    List<EventResult> findAll();
    Optional<EventResult> findByEventId(String eventId);
}
