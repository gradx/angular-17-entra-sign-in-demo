import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthStoreProvider } from './app/signal-stores/auth-store';
import { DataService } from './app/services/data.service';
import { MsalService } from '@azure/msal-angular';


declare global {
  interface Window {
    handleResponse: (response: any) => void;
    handleRedirectCallback: (error: any, response: any) => void;
    authProvider: AuthStoreProvider;
    dataService: DataService;
    msalService: MsalService
  }
}

function decodeJwtResponse(token: string) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

window.handleRedirectCallback = (error: any, response: any) => { 
  return;
  console.log(response);
}

window.handleResponse = (response: any) => { 
  return;

  window.dataService.validateToken(JSON.stringify(response.credential)).subscribe({
    next: response => {
      let result = response as string;
      let responsePayload = decodeJwtResponse(result);

      window.authProvider.store.update({ 
          name: responsePayload.name, 
          sub: responsePayload.sub, 
          given_name: responsePayload.given_name, 
          family_name: responsePayload.family_name, 
          email: responsePayload.email,
          picture: responsePayload.website 
        }
      );

      window.authProvider.saveToken(result);
      window.location.href = '/login-result';
    }
  });

}

bootstrapApplication(AppComponent, appConfig)
  .then(ref => {
    // window.authProvider = ref.injector.get(AuthStoreProvider);
    // window.dataService = ref.injector.get(DataService);
    // window.msalService = ref.injector.get(MsalService);
  })
  .catch((err) => console.error(err));


