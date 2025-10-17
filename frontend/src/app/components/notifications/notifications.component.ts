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
    console.log('NotificationsComponent: Starting to load notifications...');
    this.notificationService.getPendingNotifications().subscribe({
      next: (data) => {
        console.log('NotificationsComponent: Successfully loaded notifications:', data);
        console.log('NotificationsComponent: Number of notifications:', data.length);
        this.notifications = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('NotificationsComponent: Failed to load notifications');
        console.error('NotificationsComponent: Error details:', err);
        console.error('NotificationsComponent: Status:', err.status);
        console.error('NotificationsComponent: Status Text:', err.statusText);
        console.error('NotificationsComponent: Error message:', err.message);
        console.error('NotificationsComponent: URL:', err.url);
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
