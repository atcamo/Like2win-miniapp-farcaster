import { AppError, NetworkError, ValidationError, WalletError } from '../types';

export function handleError(error: unknown): AppError {
  // If it's already an AppError, return as is
  if (error instanceof AppError) {
    return error;
  }

  // Handle specific error types
  if (error instanceof Error) {
    // Network/fetch errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError(error.message);
    }

    // Wallet/Web3 errors
    if (error.message.includes('wallet') || error.message.includes('transaction')) {
      return new WalletError(error.message);
    }

    // Validation errors
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return new ValidationError(error.message);
    }

    // Generic error
    return new AppError(error.message);
  }

  // Fallback for unknown error types
  return new AppError('An unexpected error occurred');
}

export function formatErrorMessage(error: AppError): string {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    case 'WALLET_ERROR':
      return 'Wallet operation failed. Please make sure your wallet is connected and try again.';
    case 'VALIDATION_ERROR':
      return 'Invalid input provided. Please check your data and try again.';
    default:
      return error.message || 'Something went wrong. Please try again.';
  }
}

export function logError(error: AppError, context?: Record<string, unknown>): void {
  const errorData = {
    name: error.name,
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error occurred:', errorData);
  }

  // In production, you would send this to your error tracking service
  // Example: Sentry, LogRocket, etc.
  // sentry.captureException(error, { extra: errorData });
}

export function createErrorBoundary() {
  return class ErrorBoundary extends Error {
    constructor(message: string, public originalError?: unknown) {
      super(message);
      this.name = 'ErrorBoundary';
    }
  };
}

// Async error wrapper for try-catch operations
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  fallback?: T
): Promise<{ data?: T; error?: AppError }> {
  try {
    const data = await asyncFn();
    return { data };
  } catch (error) {
    const appError = handleError(error);
    logError(appError);
    return { error: appError, data: fallback };
  }
}

// Sync error wrapper
export function safe<T>(
  fn: () => T,
  fallback?: T
): { data?: T; error?: AppError } {
  try {
    const data = fn();
    return { data };
  } catch (error) {
    const appError = handleError(error);
    logError(appError);
    return { error: appError, data: fallback };
  }
}