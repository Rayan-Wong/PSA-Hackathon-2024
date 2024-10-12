import User, { UserInterface } from '@/models/User';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';  
import { redirect } from 'next/navigation';
  
const MONGO_URI = process.env.MONGO_URI;  
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};  
export async function connectMongo() {  
    console.log('connecting...');
    if (!MONGO_URI) {  
        throw new Error('Please define the MONGO_URI environment variable inside .env.local');  
    } 
    if (cached.connection) {  
        return cached.connection;  
    }
    if (!cached.promise) {  
        const opts = {  
            bufferCommands: false,  
        };
        cached.promise = mongoose.connect(MONGO_URI, opts);  
    }
    try {  
        cached.connection = await cached.promise;
    } catch (e) {  
        cached.promise = undefined;  
        throw e;  
    }  
    console.log('connected!');
    return cached.connection;  
}

export async function addUser(email: string, hashedPassword: string) {
  try {
    await connectMongo();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      return 'User already exists';
    }

    const newUser: UserInterface = {
      email,
      password: hashedPassword,
      category: 'hi',
      level: 1
    };
    
    await User.create(newUser);
    return 'success';
    
  } catch {
    return 'failed';
  }
}

export async function loginUser(email: string, enteredPassword: string) {
  try {
    await connectMongo();
    console.log("connected");
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return {'status': 'failure', message: 'User does not exist'}
    }
    const passwordMatch = await bcrypt.compare(enteredPassword, existingUser.password);
    if (!passwordMatch) {
      return { status: 'failure', message: 'Wrong credentials'}
    } else {
      return {status: 'success', message: 'User logged in'}
    }
  } catch {
    return {status: 'failure', message: 'Something went wrong. Please try again later.'}
  }
}