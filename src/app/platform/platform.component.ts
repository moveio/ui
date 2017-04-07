import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent {

  constructor(private router: Router) {
  }

  logOut(): void {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl(`landing`);
  }

  toolbarRedirect(id: string): void {
    this.router.navigateByUrl('/platform/' + id);
  }

}
