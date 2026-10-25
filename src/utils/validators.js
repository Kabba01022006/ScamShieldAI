/**
 * Form Validation Functions for ScamShield AI
 * Har function ek simple rule check karta hai:
 * Agar error ho to Error Message return karta hai, nahi to null.
 */

// 1. Check karta hai ki input khali (empty) na ho
export const required = (message = 'This field is required') => (value) => {
  if (!value || String(value).trim() === '') return message;
  return null;
};

// 2. Minimum length check karta hai (e.g. at least 6 characters)
export const minLength = (min, message) => (value) => {
  if (!value) return null;
  if (String(value).trim().length < min) {
    return message || `Must be at least ${min} characters`;
  }
  return null;
};

// 3. Simple Email format check (contains @ and .)
export const email = (message = 'Please enter a valid email address') => (value) => {
  if (!value) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(value).trim()) ? null : message;
};

// 4. Indian 10-digit phone number check
export const indianPhone = (message = 'Enter a valid 10-digit Indian mobile number') => (value) => {
  if (!value) return null;
  const cleaned = String(value).replace(/[\s\-()]/g, '');
  const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(cleaned) ? null : message;
};

// 5. UPI ID format check (e.g. name@bank)
export const upiId = (message = 'Enter a valid UPI ID (e.g., username@bank)') => (value) => {
  if (!value) return null;
  const cleaned = String(value).trim();
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z0-9]{2,64}$/;
  return upiRegex.test(cleaned) ? null : message;
};

// 6. Positive amount check (money > 0)
export const positiveAmount = (message = 'Amount must be greater than ₹0') => (value) => {
  if (!value && value !== 0) return null;
  const num = Number(value);
  if (isNaN(num) || num <= 0) return message;
  return null;
};

// 7. Check karta hai ki incident date future (aane wale kal) ki na ho
export const dateNotInFuture = (message = 'Incident date cannot be in the future') => (value) => {
  if (!value) return null;
  const selectedDate = new Date(value);
  const now = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  now.setHours(23, 59, 59, 999);
  if (selectedDate > now) return message;
  return null;
};

// 8. Confirm password check (kya dono passwords match karte hain)
export const matchesField = (targetFieldName, message = 'Fields do not match') => (value, allValues) => {
  if (!value) return null;
  if (!allValues || value !== allValues[targetFieldName]) return message;
  return null;
};

// 9. Ek se zyada validators ko ek sath run karne ke liye helper
export const composeValidators = (...validators) => (value, allValues) => {
  for (const validator of validators) {
    if (typeof validator === 'function') {
      const error = validator(value, allValues);
      if (error) return error;
    }
  }
  return null;
};
