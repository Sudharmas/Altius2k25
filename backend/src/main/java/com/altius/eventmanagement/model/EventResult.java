package com.altius.eventmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "EVENT_RESULTS")
public class EventResult {
    
    @Id
    private String id;
    
    private String coordinatorId;
    private String eventId;
    private String winnersDept;
    private String runnersDept;
    private LocalDateTime submittedAt;
    
}
