package com.altius.eventmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultSubmissionRequest {
    private String coordinatorId;
    private String eventId;
    private String winnersDept;
    private String runnersDept;
}
