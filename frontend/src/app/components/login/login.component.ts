import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response: any) => {
          if (response && response.username && response.role) {
            this.authService.setUser({
              username: response.username,
              role: response.role
            });
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Login failed. Please try again.';
        }
      });
  }
}
