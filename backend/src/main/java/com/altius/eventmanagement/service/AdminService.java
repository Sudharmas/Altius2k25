package com.altius.eventmanagement.service;

import com.altius.eventmanagement.dto.ResultSubmissionRequest;
import com.altius.eventmanagement.model.EventResult;
import com.altius.eventmanagement.model.Notification;
import com.altius.eventmanagement.repository.EventResultRepository;
import com.altius.eventmanagement.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    
    @Autowired
    private EventResultRepository eventResultRepository;
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private ChampionsService championsService;
    
    public EventResult submitResult(ResultSubmissionRequest request) {
        // Validate event ID
        if (!com.altius.eventmanagement.constants.EventConstants.isValidEventId(request.getEventId())) {
            throw new IllegalArgumentException("Invalid event ID: " + request.getEventId());
        }
        
        // Validate department IDs
        if (!com.altius.eventmanagement.constants.DepartmentConstants.isValidDepartmentId(request.getWinnersDept())) {
            throw new IllegalArgumentException("Invalid winner department ID: " + request.getWinnersDept());
        }
        
        if (!com.altius.eventmanagement.constants.DepartmentConstants.isValidDepartmentId(request.getRunnersDept())) {
            throw new IllegalArgumentException("Invalid runner department ID: " + request.getRunnersDept());
        }
        
        EventResult eventResult = new EventResult();
        eventResult.setCoordinatorId(request.getCoordinatorId());
        eventResult.setEventId(request.getEventId());
        eventResult.setEventName(com.altius.eventmanagement.constants.EventConstants.getEventName(request.getEventId()));
        eventResult.setWinnersDept(request.getWinnersDept());
        eventResult.setWinnersDeptName(com.altius.eventmanagement.constants.DepartmentConstants.getDepartmentName(request.getWinnersDept()));
        eventResult.setRunnersDept(request.getRunnersDept());
        eventResult.setRunnersDeptName(com.altius.eventmanagement.constants.DepartmentConstants.getDepartmentName(request.getRunnersDept()));
        eventResult.setSubmittedAt(LocalDateTime.now());
        
        EventResult savedResult = eventResultRepository.save(eventResult);
        
        // Immediately update champions count
        championsService.championsCounter(request.getWinnersDept(), request.getRunnersDept());
        
        return savedResult;
    }
    
    public List<EventResult> getAllResults() {
        return eventResultRepository.findAll();
    }
    
    public EventResult updateResult(String id, ResultSubmissionRequest request) {
        Optional<EventResult> resultOpt = eventResultRepository.findById(id);
        
        if (resultOpt.isPresent()) {
            EventResult existingResult = resultOpt.get();
            existingResult.setWinnersDept(request.getWinnersDept());
            existingResult.setWinnersDeptName(com.altius.eventmanagement.constants.DepartmentConstants.getDepartmentName(request.getWinnersDept()));
            existingResult.setRunnersDept(request.getRunnersDept());
            existingResult.setRunnersDeptName(com.altius.eventmanagement.constants.DepartmentConstants.getDepartmentName(request.getRunnersDept()));
            
            return eventResultRepository.save(existingResult);
        }
        
        return null;
    }
    
    public Notification createUpdateRequest(String coordinatorId, String eventId, String message) {
        Notification notification = new Notification();
        notification.setCoordinatorId(coordinatorId);
        notification.setEventId(eventId);
        notification.setMessage(message);
        notification.setStatus("PENDING");
        notification.setCreatedAt(LocalDateTime.now());
        
        return notificationRepository.save(notification);
    }
    
    public List<Notification> getPendingNotifications() {
        return notificationRepository.findByStatusOrderByCreatedAtDesc("PENDING");
    }
    
    public Notification updateNotificationStatus(Long id, String status) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setStatus(status);
            
            return notificationRepository.save(notification);
        }
        
        return null;
    }
}
