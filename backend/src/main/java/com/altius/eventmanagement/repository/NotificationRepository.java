package com.altius.eventmanagement.repository;

import com.altius.eventmanagement.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByStatusOrderByCreatedAtDesc(String status);
}
