// Error handling utility with generic user messages and detailed logging

import { safeStorage } from '@/utils/storage';

interface ErrorDetails {
  code: string;
  userMessage: string;
  technicalDetails: string;
  timestamp: string;
}

// Generate unique error codes
const generateErrorCode = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ERR-${timestamp}-${random}`.toUpperCase();
};

// Log error details (in production, this would go to your logging service)
const logError = (error: ErrorDetails): void => {
  try {
    console.error('Error Details:', {
      code: error.code,
      message: error.technicalDetails,
      timestamp: error.timestamp,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    });
  } catch {
    // noop
  }

  try {
    if (typeof localStorage === 'undefined') return;
    const existing = localStorage.getItem('error_log');
    const errorLog = existing ? JSON.parse(existing) : [];
    errorLog.push(error);
    errorLog.splice(0, Math.max(0, errorLog.length - 10));
    localStorage.setItem('error_log', JSON.stringify(errorLog));
  } catch {
    // localStorage may be unavailable / blocked
  }
};

// Handle errors with generic user messages
export const handleError = (technicalError: string, context: string = 'general'): { code: string; userMessage: string } => {
  const errorCode = generateErrorCode();
  
  const errorDetails: ErrorDetails = {
    code: errorCode,
    userMessage: `Something went wrong. Error Code: ${errorCode}. Please screenshot this error code and contact our support team.`,
    technicalDetails: `${context}: ${technicalError}`,
    timestamp: new Date().toISOString()
  };
  
  logError(errorDetails);
  
  return {
    code: errorCode,
    userMessage: errorDetails.userMessage
  };
};

// Rate limiting utility
interface RateLimitConfig {
  key: string;
  maxAttempts: number;
  windowMs: number;
}

export const checkRateLimit = (config: RateLimitConfig): { allowed: boolean; timeRemaining?: number } => {
  const now = Date.now();

  if (typeof localStorage === 'undefined') return { allowed: true };

  let attempts: number[] = [];
  try {
    attempts = JSON.parse(localStorage.getItem(`rate_limit_${config.key}`) || '[]');
  } catch {
    attempts = [];
  }
  
  // Clean old attempts outside the window
  const safeAttempts = Array.isArray(attempts) ? attempts : [];
  const validAttempts = safeAttempts.filter((timestamp: number) => Number.isFinite(timestamp) && now - timestamp < config.windowMs);
  
  if (validAttempts.length >= config.maxAttempts) {
    const oldestAttempt = Math.min(...validAttempts);
    const timeRemaining = config.windowMs - (now - oldestAttempt);
    return { allowed: false, timeRemaining: Math.ceil(timeRemaining / 1000) };
  }
  
  // Add current attempt
  validAttempts.push(now);
  try {
    localStorage.setItem(`rate_limit_${config.key}`, JSON.stringify(validAttempts));
  } catch {
    return { allowed: true };
  }
  
  return { allowed: true };
};

// Generic error messages for different contexts
export const ERROR_MESSAGES = {
  NETWORK: "Connection issue detected. Please check your internet and try again.",
  VALIDATION: "Please check your input and try again.",
  RATE_LIMIT: "Too many attempts. Please wait before trying again.",
  GENERAL: "An unexpected error occurred. Please try again later."
} as const;
