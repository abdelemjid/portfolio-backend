import mongoose from 'mongoose';

export async function connectDatabase() {
  while (true) {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECTION_URI!);
      break;
    } catch (err) {
      console.error('[!] MongoDB connection failed, retrying in 5s...', err);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('[+] MongoDB connected');
});
