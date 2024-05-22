## MSAL v3 + Angular 17 + Popup/Redirect demo

Complete e2e demo of an integration with Microsoft's Entra using MSAL v3

## Configuration Required after setting up tenant in Azure

Update app.config.ts and environment.ts for Angular
`      redirectUri: 'http://localhost:4200/login-result', `

```
export const environment = {
    production: true,
    msalConfig: {
        auth: {
            clientId: '165040ca-d322-433d-8dd9-ffdc95008c38',
            authority: 'https://login.microsoftonline.com/common'
        }
    },
    apiConfig: {
        scopes: ['user.read'],
        uri: 'https://graph.microsoft.com/v1.0/me'
    }
};

```

Update appsettings.json for .NET 8.0 
```
  "Entra": {
    "Issuer": "https://login.microsoftonline.com/",
    "ClientId": "165040ca-d322-433d-8dd9-ffdc95008c38",
    "TenantId": "57543043-e835-409c-ad0b-9f3b46924a55",
    "Audience": "165040ca-d322-433d-8dd9-ffdc95008c38",
    "Graph": "https://graph.microsoft.com/v1.0/me/"
  },
```
