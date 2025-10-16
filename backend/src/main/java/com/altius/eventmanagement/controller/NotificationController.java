// filepath: /workspaces/Altius2k25/backend/src/main/java/com/altius/eventmanagement/controller/NotificationController.java
package com.altius.eventmanagement.controller;

import com.altius.eventmanagement.model.Notification;
import com.altius.eventmanagement.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from frontend
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/notifications")
    public List<Notification> getPendingNotifications() {
        return notificationService.getPendingNotifications();
    }

    @PostMapping("/notifications/{id}/approve")
    public ResponseEntity<Void> approveNotification(@PathVariable Long id) {
        notificationService.updateNotificationStatus(id, "APPROVED");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/notifications/{id}/reject")
    public ResponseEntity<Void> rejectNotification(@PathVariable Long id) {
        notificationService.updateNotificationStatus(id, "REJECTED");
        return ResponseEntity.ok().build();
    }
}