import { Component, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthStoreProvider } from '../../signal-stores/auth-store';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login-result',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './login-result.component.html',
  styleUrl: './login-result.component.less',
})

export class LoginResultComponent {
  authProvider: AuthStoreProvider;
  data: DataService;

  message$: Observable<string> | null = null;
  authService: MsalService;


  constructor(private msal: MsalService, private authStoreProvider: AuthStoreProvider, private dataService: DataService) {
    this.authProvider = authStoreProvider;
    this.data = dataService;
    this.authService = msal;
  }

  ngOnInit() {
    // required to stop redirection from msal?
    window.location.replace("localhost:4200/signin");
    this.loadProfile();  
  }

  loadProfile() {
    this.authService.acquireTokenSilent({
      scopes: ['https://graph.microsoft.com/User.Read'],
      account: this.msal.instance.getAllAccounts()[0],
    }).subscribe(res => {
      console.log('res', res);
      this.dataService.validateToken(JSON.stringify(res)).subscribe(response => {
        console.log('response', response);
        let result = response as string;
        let responsePayload = decodeJwtResponse(result);

        this.authProvider.store.update({ 
            name: responsePayload.name, 
            sub: responsePayload.sub, 
            given_name: responsePayload.given_name, 
            family_name: responsePayload.family_name, 
            email: responsePayload.email,
            picture: responsePayload.website 
          }
        );

        this.authProvider.saveToken(result);
        this.message$ = this.dataService.getMessage();
      })
    });

    function decodeJwtResponse(token: string) {
      let base64Url = token.split('.')[1]
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }
  }

}
