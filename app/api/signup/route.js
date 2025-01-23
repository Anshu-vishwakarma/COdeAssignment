import { NextResponse } from 'next/server'; // Import NextResponse
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// POST handler
export async function POST(req) {
  const { name, email, password } = await req.json(); // Parse JSON data from the request

  // Check if any fields are missing
  if (!name || !email || !password) {
    console.error('Missing fields:', { name, email, password });
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('User already exists:', email);
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student', // Default role
    });

    console.log('New user created:', newUser);
    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
