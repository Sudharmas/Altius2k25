// filepath: /workspaces/Altius2k25/backend/src/main/java/com/altius/eventmanagement/controller/NotificationController.java
package com.altius.eventmanagement.controller;

import com.altius.eventmanagement.model.Notification;
import com.altius.eventmanagement.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<Notification>> getPublicNotifications() {
        System.out.println("NotificationController: Received GET request for /api/notifications");
        try {
            // This endpoint provides public access to pending notifications
            List<Notification> notifications = notificationService.getPendingNotifications();
            System.out.println("NotificationController: Returning " + notifications.size() + " notifications");
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            System.err.println("NotificationController: Error processing request: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}