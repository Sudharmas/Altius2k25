package com.altius.eventmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "EVENTS")
public class Event {
    
    @Id
    private String id;
    
    private String eventId;
    private String departmentId;
    private String eventName;
    private String posterPath;
    private String rulebookPath;
    private Map<String, String> coordinators; // Map of coordinatorId -> contactNumber
    
}
