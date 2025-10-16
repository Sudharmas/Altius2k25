package com.altius.eventmanagement.repository;

import com.altius.eventmanagement.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByStatus(String status);
    List<Notification> findByStatusOrderByCreatedAtDesc(String status);
}
