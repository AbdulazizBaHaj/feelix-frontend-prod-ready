import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validate email exists
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Simulate 15% error rate for testing
    if (Math.random() < 0.15) {
      return NextResponse.json(
        {
          success: false,
          message: 'Service temporarily unavailable. Please try again.',
        },
        { status: 500 }
      );
    }

    // Success response (in real app, would send email here)
    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
