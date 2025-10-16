import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) { }

  // Method to get pending notifications from the backend
  getPendingNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  // Method to approve a notification
  approveNotification(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/approve`, {});
  }

  // Method to reject a notification
  rejectNotification(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/reject`, {});
  }
}