import mongoose from 'mongoose';

export default async () => {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.DB_URI).then(res => {
        console.log('mongodb connected');
    }).catch(e => {
        console.error(e);
    })
}