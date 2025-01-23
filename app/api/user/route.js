
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

// GET handler for listing all users (Admin only)
export async function GET(req) {
  try {
    await dbConnect();

    const users = await User.find()
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
