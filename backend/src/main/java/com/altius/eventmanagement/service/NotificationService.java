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
        // Use the method that sorts by creation date in descending order
        return notificationRepository.findByStatusOrderByCreatedAtDesc("PENDING");
    }

    public void updateNotificationStatus(Long id, String status) {
        Notification notification = notificationRepository.findById(id).orElseThrow();
        notification.setStatus(status);
        notificationRepository.save(notification);
    }
}