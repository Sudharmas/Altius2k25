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
    
    public EventResult submitResult(ResultSubmissionRequest request) {
        EventResult result = new EventResult();
        result.setCoordinatorId(request.getCoordinatorId());
        result.setEventId(request.getEventId());
        result.setWinnersDept(request.getWinnersDept());
        result.setRunnersDept(request.getRunnersDept());
        result.setSubmittedAt(LocalDateTime.now());
        
        return eventResultRepository.save(result);
    }
    
    public List<EventResult> getAllResults() {
        return eventResultRepository.findAll();
    }
    
    public EventResult updateResult(Long id, ResultSubmissionRequest request) {
        Optional<EventResult> resultOpt = eventResultRepository.findById(id);
        
        if (resultOpt.isPresent()) {
            EventResult result = resultOpt.get();
            result.setWinnersDept(request.getWinnersDept());
            result.setRunnersDept(request.getRunnersDept());
            
            return eventResultRepository.save(result);
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
