export const ENV_NAMES = [
    'DB_URI',
    'PORT',
    'JWT_SECRET',
]
export default async () => {
    if(!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
    if(!process.env.PORT) process.env.PORT = 3000;
    for (const env_name of ENV_NAMES) {
        if(!process.env[env_name]) throw new Error(`Environment Variable ${env_name} was not found`);
    }
};