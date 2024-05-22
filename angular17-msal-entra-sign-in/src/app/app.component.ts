import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStoreProvider }  from './signal-stores/auth-store';
import { DataService } from './services/data.service';
import { MsalService, MsalModule } from '@azure/msal-angular';
import { RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MsalModule, RouterOutlet, RouterLink],
  providers: [AuthStoreProvider, DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})


export class AppComponent {
  title = 'Angular17SignInDemo';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService) {}


  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();
  }
}
