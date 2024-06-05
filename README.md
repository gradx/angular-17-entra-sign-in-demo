# MSAL v3 + Angular 17 + Popup/Redirect demo

This repo is no longer maintained.  Visit the Angular 18 repo [here](https://github.com/gradx/angular-18-entra-sign-in-demo)

Complete e2e demo of an integration with Microsoft Entra using MSAL v3 clientside and .NET 8.0 Web API server-side

**Includes:** 
- Sign In
- Token relay to server
- Token validation server-side
- JWT setup in Web Api
- Identity managed in NgRx Signal Store

Designed as a skeleton project that can help bootstrap a new application with minimal changes

### Configuration Required after setting up tenant in Azure

Update app.config.ts 
`redirectUri: 'http://localhost:4200/login-result', `

and environment.ts for Angular
`clientId: '165040ca-d322-433d-8dd9-ffdc95008c38'`

Update appsettings.json for .NET 8.0 
```typescript
  "Entra": {
    "Issuer": "https://login.microsoftonline.com/",
    "ClientId": "165040ca-d322-433d-8dd9-ffdc95008c38",
    "TenantId": "57543043-e835-409c-ad0b-9f3b46924a55",
    "Audience": "165040ca-d322-433d-8dd9-ffdc95008c38",
    "Graph": "https://graph.microsoft.com/v1.0/me/"
  },
```
