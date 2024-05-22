import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { PopupRequest } from '@azure/msal-browser';
import { AuthStoreProvider } from '../../signal-stores/auth-store';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [

  ],
  providers: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.less'
})



export class GoogleSigninComponent {
  env: any;
  authService: MsalService;
  res: any;
  dataService: DataService;

  constructor(private router: Router, private authProvider: AuthStoreProvider, private msal: MsalService, private data: DataService,   private http: HttpClient) { 
    this.env = environment;
    this.authService = msal;
    this.dataService = data;
  }

  loginPopup() {

    const POPUP_REQUEST: PopupRequest /*| SilentRequest*/ = {
      scopes: ['https://graph.microsoft.com/User.Read'],// Add more permissions in this array as needed.
      prompt: 'login',//'consent',//'create''login',//'select_account',
      }

    this.authService.acquireTokenPopup(POPUP_REQUEST)
      .subscribe(res => {
        console.log('result', res);
        this.res = res;
      });
  }

  loginRedirect() {

    const POPUP_REQUEST: PopupRequest /*| SilentRequest*/ = {
      scopes: ['https://graph.microsoft.com/User.Read'],// Add more permissions in this array as needed.
      prompt: 'login',//'consent',//'create''login',//'select_account',
      }

    this.authService.acquireTokenRedirect(POPUP_REQUEST)
      .subscribe(res => {
        console.log('result', res);
        this.res = res;
      });
  }


  getProfile() {
    let accounts = this.authService.instance.getAllAccounts();
    //console.log(accounts);

    console.log(this.authService.instance.getAccountByLocalId(accounts[0].localAccountId));

    this.http.get(environment.apiConfig.uri)
      .subscribe(profile => {
        console.log(profile);
      });
   }
}
