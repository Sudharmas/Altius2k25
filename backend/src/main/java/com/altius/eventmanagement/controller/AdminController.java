package com.altius.eventmanagement.controller;

import com.altius.eventmanagement.dto.ResultSubmissionRequest;
import com.altius.eventmanagement.model.EventResult;
import com.altius.eventmanagement.model.Notification;
import com.altius.eventmanagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @PostMapping("/submit-result")
    public ResponseEntity<EventResult> submitResult(@RequestBody ResultSubmissionRequest request) {
        EventResult result = adminService.submitResult(request);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/results")
    public ResponseEntity<List<EventResult>> getAllResults() {
        return ResponseEntity.ok(adminService.getAllResults());
    }
    
    @PutMapping("/results/{id}")
    public ResponseEntity<EventResult> updateResult(
            @PathVariable String id, 
            @RequestBody ResultSubmissionRequest request) {
        EventResult result = adminService.updateResult(id, request);
        
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/request-update")
    public ResponseEntity<Notification> requestUpdate(@RequestBody Map<String, String> request) {
        String coordinatorId = request.get("coordinatorId");
        String eventId = request.get("eventId");
        String message = request.get("message");
        
        Notification notification = adminService.createUpdateRequest(coordinatorId, eventId, message);
        return ResponseEntity.ok(notification);
    }
    
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getPendingNotifications() {
        return ResponseEntity.ok(adminService.getPendingNotifications());
    }
    
    @PutMapping("/notifications/{id}")
    public ResponseEntity<Notification> updateNotificationStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        Notification notification = adminService.updateNotificationStatus(id, status);
        
        if (notification != null) {
            return ResponseEntity.ok(notification);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
