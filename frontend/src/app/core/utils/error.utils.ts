/**
 * Error handling utilities for extracting meaningful error messages
 * from various error object structures (Supabase, HTTP, Network, etc.)
 */

export interface ErrorObject {
  message?: string;
  error?: any;
  status?: number;
  statusCode?: number;
  name?: string;
  code?: string;
  details?: string;
  hint?: string;
}

/**
 * Recursively extracts the most meaningful error message from a complex error object
 * @param error - The error object to extract message from
 * @param maxDepth - Maximum recursion depth to prevent infinite loops
 * @returns The most meaningful error message found
 */
export function extractErrorMessage(error: any, maxDepth: number = 5): string {
  if (!error || maxDepth <= 0) {
    return 'Signup failed. Please try again.';
  }

  // Handle Error instances
  if (error instanceof Error) {
    return error.message || 'An unexpected error occurred.';
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle null/undefined
  if (error === null || error === undefined) {
    return 'Signup failed. Please try again.';
  }

  // Priority order for error message extraction
  const messageSources = [
    // Supabase specific error structures (highest priority)
    () => error.details,
    () => error.hint,
    
    // Deep nested error structures
    () => error.error?.error?.error?.message,
    () => error.error?.error?.message,
    () => error.error?.message,
    
    // Direct message properties
    () => error.message,
    
    // HTTP error structures
    () => error.error?.error?.message,
    () => error.error?.message,
  ];

  // Try each message source in priority order
  for (const getMessage of messageSources) {
    try {
      const message = getMessage();
      if (message && typeof message === 'string' && message.trim()) {
        return message.trim();
      }
    } catch (e) {
      // Continue to next source if this one fails
      continue;
    }
  }

  // If no message found, try to extract from nested objects recursively
  if (typeof error === 'object') {
    for (const key in error) {
      if (error.hasOwnProperty(key) && typeof error[key] === 'object') {
        const nestedMessage = extractErrorMessage(error[key], maxDepth - 1);
        if (nestedMessage && nestedMessage !== 'Signup failed. Please try again.') {
          return nestedMessage;
        }
      }
    }
  }

  // Fallback message
  return 'Signup failed. Please try again.';
}

/**
 * Determines if an error is a network-related error
 * @param error - The error object to check
 * @returns True if it's a network error
 */
export function isNetworkError(error: any): boolean {
  if (!error) return false;
  
  const networkErrorPatterns = [
    'Network Error',
    'Failed to fetch',
    'Request timeout',
    'Connection refused',
    'ENOTFOUND',
    'ECONNREFUSED',
    'ETIMEDOUT'
  ];

  const errorMessage = extractErrorMessage(error).toLowerCase();
  return networkErrorPatterns.some(pattern => 
    errorMessage.includes(pattern.toLowerCase())
  );
}

/**
 * Determines if an error is a Supabase authentication error
 * @param error - The error object to check
 * @returns True if it's a Supabase auth error
 */
export function isSupabaseAuthError(error: any): boolean {
  if (!error) return false;
  
  const authErrorPatterns = [
    'User already registered',
    'Invalid email',
    'Password should be at least',
    'Email not confirmed',
    'AuthApiError'
  ];

  const errorMessage = extractErrorMessage(error).toLowerCase();
  return authErrorPatterns.some(pattern => 
    errorMessage.includes(pattern.toLowerCase())
  );
}

/**
 * Determines if an error is a Supabase database error
 * @param error - The error object to check
 * @returns True if it's a Supabase database error
 */
export function isSupabaseDatabaseError(error: any): boolean {
  if (!error) return false;
  
  const dbErrorPatterns = [
    'duplicate key value violates unique constraint',
    'violates not-null constraint',
    'violates check constraint',
    'PostgrestError',
    '23505', // Unique constraint violation
    '23502', // Not null constraint violation
    '23514'  // Check constraint violation
  ];

  const errorMessage = extractErrorMessage(error).toLowerCase();
  return dbErrorPatterns.some(pattern => 
    errorMessage.includes(pattern.toLowerCase())
  );
}

/**
 * Gets a user-friendly error message based on the error type
 * @param error - The error object
 * @returns A user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: any): string {
  const message = extractErrorMessage(error);
  
  // If we already have a good message, return it
  if (message && message !== 'Signup failed. Please try again.') {
    return message;
  }

  // Provide specific messages based on error type
  if (isNetworkError(error)) {
    return 'Network connection error. Please check your internet connection and try again.';
  }

  if (isSupabaseAuthError(error)) {
    return 'Authentication error. Please check your information and try again.';
  }

  if (isSupabaseDatabaseError(error)) {
    return 'Database error. Please try again or contact support if the problem persists.';
  }

  // Default fallback
  return 'Signup failed. Please try again.';
} 