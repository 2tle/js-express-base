import envLoader from './environment.js';
import databaseLoader from './database.js';
import expressLoader from './express.js';

export default async ({app}) => {
    await envLoader();
    await databaseLoader();
    await expressLoader(app);
};