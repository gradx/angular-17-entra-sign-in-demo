# MSAL v3 + Angular 17 + Popup/Redirect demo

Complete e2e demo of an integration with Microsoft's Entra using MSAL v3

### Configuration Required after setting up tenant in Azure

Update app.config.ts 
`      redirectUri: 'http://localhost:4200/login-result', `

and environment.ts for Angular
` clientId: '165040ca-d322-433d-8dd9-ffdc95008c38'`

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
