import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Notification } from '../../models/models';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAdministrator()) {
      this.router.navigate(['/home']);
      return;
    }
    
    this.loadNotifications();
  }

  loadNotifications() {
    this.adminService.getPendingNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }

  approveRequest(notification: Notification) {
    if (notification.id) {
      this.adminService.updateNotificationStatus(notification.id, 'APPROVED').subscribe({
        next: () => {
          this.loadNotifications();
        },
        error: (error) => {
          console.error('Error approving request:', error);
        }
      });
    }
  }

  rejectRequest(notification: Notification) {
    if (notification.id) {
      this.adminService.updateNotificationStatus(notification.id, 'REJECTED').subscribe({
        next: () => {
          this.loadNotifications();
        },
        error: (error) => {
          console.error('Error rejecting request:', error);
        }
      });
    }
  }
}
