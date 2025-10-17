import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Define an interface that matches your backend Notification model
export interface Notification {
  id: number;
  coordinatorId: string;
  eventId: string;
  message: string;
  status: string;
  createdAt: string; // Comes as a string in JSON
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/api/notifications`;

  constructor(private http: HttpClient) { }

  // Method to get pending notifications from the backend
  getPendingNotifications(): Observable<Notification[]> {
    const url = this.apiUrl;
    console.log('NotificationService: Making GET request to:', url);
    console.log('NotificationService: Full API URL:', `${environment.apiUrl}/api/notifications`);
    return this.http.get<Notification[]>(this.apiUrl);
  }

  // Method to approve a notification
  approveNotification(id: number): Observable<void> {
    // Note: The approval endpoint remains under /api/admin for security
    return this.http.post<void>(`${environment.apiUrl}/admin/notifications/${id}/approve`, {});
  }

  // Method to reject a notification
  rejectNotification(id: number): Observable<void> {
    // Note: The rejection endpoint remains under /api/admin for security
    return this.http.post<void>(`${environment.apiUrl}/admin/notifications/${id}/reject`, {});
  }
}