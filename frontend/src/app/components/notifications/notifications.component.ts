import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  
  notifications: Notification[] = [];
  isLoading = true;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.isLoading = true;
    this.notificationService.getPendingNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load notifications', err);
        this.isLoading = false;
      }
    });
  }

  approve(id: number): void {
    this.notificationService.approveNotification(id).subscribe({
      next: () => {
        // Remove the notification from the list without a page reload
        this.notifications = this.notifications.filter(n => n.id !== id);
      },
      error: (err) => console.error(`Failed to approve notification ${id}`, err)
    });
  }

  reject(id: number): void {
    this.notificationService.rejectNotification(id).subscribe({
      next: () => {
        // Remove the notification from the list without a page reload
        this.notifications = this.notifications.filter(n => n.id !== id);
      },
      error: (err) => console.error(`Failed to reject notification ${id}`, err)
    });
  }
}
