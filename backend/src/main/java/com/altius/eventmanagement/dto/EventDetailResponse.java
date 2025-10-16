package com.altius.eventmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDetailResponse {
    private String eventId;
    private String eventName;
    private String departmentId;
    private String posterPath;
    private String rulebookPath;
    private Map<String, String> coordinators;
}
