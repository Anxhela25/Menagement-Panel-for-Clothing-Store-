import { Component } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { AuthService } from 'src/app/service/authservice/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    // Call the logout method from the AuthService
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
