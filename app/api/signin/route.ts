// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(request: Request) {
  console.log("entered POST");
  const { email, password }: User = await request.json();
  console.log("got POST request data");
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }
  console.log("validated x2");

  try {
    // Hash the password
    const result = await loginUser(email, password);
    console.log("done login function");
    if (result.status == 'success') {
        return NextResponse.json({ message: 'Logged In' }, { status: 201 });
    } else {
        return NextResponse.json({ message: result.message }, { status: 409 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Login failed. Please try again soon', error }, { status: 500 });
  }
}
