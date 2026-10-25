import { useState } from 'react';

/**
 * useForm - Simple & Beginner-Friendly Form Hook
 * 
 * Yeh hook form ki 2 cheezein manage karta hai:
 * 1. values: Inputs me kya text likha hai
 * 2. errors: Agar validation fail ho to kya error dikhana hai
 */
export function useForm({ initialValues = {}, validators = {}, onSubmit } = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Jab user input box me type karta hai
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    // Value update karo
    setValues((prev) => ({ ...prev, [name]: fieldValue }));

    // Jaise hi user sahi type kare, uska purana error hata do
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 2. Jab user input se focus hatata hai (blur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (validators[name]) {
      const error = validators[name](value, values);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  // 3. Jab form submit hota hai
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Saare fields ko check karo
    const newErrors = {};
    Object.keys(validators).forEach((key) => {
      const validatorFn = validators[key];
      if (typeof validatorFn === 'function') {
        const error = validatorFn(values[key], values);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    // Agar koi error mila, to form submit mat hone do
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Agar sab sahi hai, to onSubmit function call karo
    setIsSubmitting(true);
    if (onSubmit) {
      onSubmit(values);
    }
    setIsSubmitting(false);
  };

  // 4. Form ko reset karne ke liye
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    reset,
  };
}

export default useForm;
