import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventResult, Notification } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  submitResult(result: EventResult): Observable<EventResult> {
    return this.http.post<EventResult>(`${this.apiUrl}/submit-result`, result);
  }

  getAllResults(): Observable<EventResult[]> {
    return this.http.get<EventResult[]>(`${this.apiUrl}/results`);
  }

  updateResult(id: number, result: EventResult): Observable<EventResult> {
    return this.http.put<EventResult>(`${this.apiUrl}/results/${id}`, result);
  }

  requestUpdate(request: any): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/request-update`, request);
  }

  getPendingNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  updateNotificationStatus(id: number, status: string): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/notifications/${id}`, { status });
  }
}
