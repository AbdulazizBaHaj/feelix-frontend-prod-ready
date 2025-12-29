import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Validate token exists
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    // Simulate token validation (mock logic)
    if (token === 'invalid' || token.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Simulate 20% error rate for testing
    if (Math.random() < 0.2) {
      return NextResponse.json(
        {
          success: false,
          message: 'Verification service temporarily unavailable',
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Your email has been verified successfully!',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
