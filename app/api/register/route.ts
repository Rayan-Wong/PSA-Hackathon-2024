// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { addUser } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password }: User = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await addUser(email, hashedPassword);
    if (result == 'success') {
        return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
    } else if (result == 'failed') {
        return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Registration failed.', error }, { status: 500 });
  }
}
