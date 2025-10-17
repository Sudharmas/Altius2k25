import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // FIX: Use the apiUrl from the environment file
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    // FIX: Construct the full URL for the API call
    return this.http.get(`${this.apiUrl}/champions/events`);
  }

  getDepartments(): Observable<any> {
    // FIX: Construct the full URL for the API call
    return this.http.get(`${this.apiUrl}/champions/departments`);
  }

  submitResult(result: any): Observable<any> {
    // FIX: Construct the full URL for the API call
    return this.http.post(`${this.apiUrl}/admin/results`, result);
  }

  getLeaderboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/champions/leaderboard`);
  }

  getAllResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/results`);
  }

  requestUpdate(requestData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications/request`, requestData);
  }
}
