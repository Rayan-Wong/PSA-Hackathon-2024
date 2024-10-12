// app/api/register/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password }: User = await request.json();
  console.log("posted")

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database
    console.log("and we r here now");
    const client = await clientPromise;
    console.log("and we r here now");
    const db = client.db('code_sprint');
    console.log("here now")

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    }

    // Create the new user
    const newUser: User = {
      email,
      password: hashedPassword,
    };
    
    await db.collection('users').insertOne(newUser);

    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Registration failed.', error }, { status: 500 });
  }
}
