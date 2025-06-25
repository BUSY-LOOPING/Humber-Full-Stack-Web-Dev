import mongoose from 'mongoose';

const dbUrl = 'mongodb://root:Test123!!@localhost:27017/';
 
export async function connect() {
  await mongoose.connect(dbUrl, { maxPoolSize: 5, minPoolSize: 2 }); //connect to mongodb
}

export default {
  connect
}