type VerifyResponse = {
  success: boolean;
  message: string;
};

export async function verifyToken(token: string): Promise<VerifyResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not configured');
  }

  const response = await fetch(`${apiUrl}/api/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Verification failed' }));
    throw new Error(error.message || 'Verification failed');
  }

  return await response.json();
}

// Password Reset Request
type PasswordResetRequestResponse = {
  success: boolean;
  message: string;
};

export async function requestPasswordReset(
  email: string
): Promise<PasswordResetRequestResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not configured');
  }

  const response = await fetch(`${apiUrl}/api/auth/password-reset-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Failed to send reset email');
  }

  return await response.json();
}

// Password Reset Confirmation
type PasswordResetConfirmResponse = {
  success: boolean;
  message: string;
};

export async function confirmPasswordReset(
  token: string,
  newPassword: string
): Promise<PasswordResetConfirmResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not configured');
  }

  const response = await fetch(`${apiUrl}/api/auth/password-reset-confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Reset failed' }));
    throw new Error(error.message || 'Failed to reset password');
  }

  return await response.json();
}
