// lib/mongodb.ts
import { User } from '@/models/User';
import { MongoClient } from 'mongodb';
import { aborted } from 'node:util';

const uri = process.env.MONGODB_URI as string;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(uri);

export async function addUser(email: string, hashedPassword: string) {
  try {
    await client.connect();

    const database = client.db('code_sprint');
    const users = database.collection('users');
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      return 'User already exists';
    }

    const newUser: User = {
      email,
      password: hashedPassword,
    };
    
    await users.insertOne(newUser);
    return 'success'
    
  } catch {
    // Ensures that the client will close when you finish/error
    return 'failed'
  } finally {
    await client.close();
  }
}

   // // Check if user already exists
    // const existingUser = await db.collection('users').findOne({ email });
    // if (existingUser) {
    //   return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    // }

    // // Create the new user
    // const newUser: User = {
    //   email,
    //   password: hashedPassword,
    // };
    
    // await db.collection('users').insertOne(newUser);