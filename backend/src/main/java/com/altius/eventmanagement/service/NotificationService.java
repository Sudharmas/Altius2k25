// filepath: /workspaces/Altius2k25/backend/src/main/java/com/altius/eventmanagement/service/NotificationService.java
package com.altius.eventmanagement.service;

import com.altius.eventmanagement.model.Notification;
import com.altius.eventmanagement.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getPendingNotifications() {
        System.out.println("NotificationService: Fetching pending notifications from Neon database");
        try {
            // Use the method that sorts by creation date in descending order
            List<Notification> notifications = notificationRepository.findByStatusOrderByCreatedAtDesc("PENDING");
            System.out.println("NotificationService: Found " + notifications.size() + " pending notifications");
            return notifications;
        } catch (Exception e) {
            System.err.println("NotificationService: Error fetching notifications: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public void updateNotificationStatus(Long id, String status) {
        System.out.println("NotificationService: Updating notification " + id + " status to " + status);
        try {
            Notification notification = notificationRepository.findById(id).orElseThrow();
            notification.setStatus(status);
            notificationRepository.save(notification);
            System.out.println("NotificationService: Successfully updated notification " + id);
        } catch (Exception e) {
            System.err.println("NotificationService: Error updating notification: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}