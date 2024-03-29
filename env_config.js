const env = process.env.ENV || 'development';

const configs = {
    development: {
        api: 'https://api.staging.com',
    },
    staging: {
        api: 'https://api.staging.com',
    },
    production: {
        api: 'https://api.production.com',
    },
}[env];

export default configs;