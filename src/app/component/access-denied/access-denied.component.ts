import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent {
  constructor(private router: Router) {}

  redirectToHomePage() {
    this.router.navigate(['/menubar/home']);
  }
}
