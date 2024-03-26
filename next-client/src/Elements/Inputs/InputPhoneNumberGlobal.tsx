import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputPhoneNumberGlobalProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: (value: string) => void; // Define onChange prop
}

const InputPhoneNumberGlobal: React.FC<InputPhoneNumberGlobalProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  onChange, // Add onChange prop
}) => {
  const [phone, setPhone] = useState(value || ''); // Initialize state with value prop

  // Update state when the value changes
  const handleChange = (value: string) => {
    console.log('value', value)
    setPhone(value); // Update state

    if (onChange) {
      onChange(value); // Call onChange prop with the new value
    }
  };

  return (
    <PhoneInput
      country={'us'}
      value={phone} // Use state value
      disabled={disabled}
      placeholder={placeholder || ' '}
      onChange={handleChange} // Use handleChange function
    />
  );
};

export default InputPhoneNumberGlobal;
