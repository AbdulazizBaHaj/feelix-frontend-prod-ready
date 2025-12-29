'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyToken } from '@/lib/api/auth';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      // schedule state updates asynchronously to avoid synchronous setState inside the effect
      setTimeout(() => {
        setStatus('error');
        setMessage('No verification token provided');
      }, 0);
      return;
    }

    // Auto-submit verification on page load
    const verify = async () => {
      try {
        const result = await verifyToken(token);
        setStatus('success');
        setMessage(result.message || 'Email verified successfully!');

        // Auto-redirect after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (error) {
        setStatus('error');
        setMessage(
          error instanceof Error ? error.message : 'Verification failed'
        );
      }
    };

    verify();
  }, [searchParams, router]);

  const handleResend = async () => {
    // TODO: Implement resend logic when backend provides endpoint
    alert('Resend verification email - To be implemented');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          {/* Loading State */}
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Verifying your account...
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email.
              </p>
            </>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
              <div className="text-green-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Verification Successful!
              </h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecting to login page...
              </p>
            </>
          )}

          {/* Error State */}
          {status === 'error' && (
            <>
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Verification Failed
              </h2>
              <p className="text-red-600 mb-6">{message}</p>
              <button
                onClick={handleResend}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Resend Verification Email
              </button>
              <button
                onClick={() => router.push('/login')}
                className="w-full mt-3 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
