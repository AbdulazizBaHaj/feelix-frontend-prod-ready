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
