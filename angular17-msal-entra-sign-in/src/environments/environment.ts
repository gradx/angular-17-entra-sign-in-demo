export const environment = {
    production: true,
    google_client_id: '222000842037-6jbt58ohas610c21jsk8c9jnlbnlacms.apps.googleusercontent.com',
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
