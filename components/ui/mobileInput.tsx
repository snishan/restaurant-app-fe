import { countryCodes, validateMobile } from '@/lib/helper/validations';
import React, { useEffect, useState } from 'react';

interface MobileInputProps {
  value: string;
  onChange: (value: string, countryCode: string) => void;
  error?: string;
  countryCodeValue?: string;
}

const MobileInput: React.FC<MobileInputProps> = ({ value, onChange, error, countryCodeValue }) => {
  const [countryCode, setCountryCode] = useState(countryCodeValue ?? '+1'); // Default country code
  const [errors, setErrors] = useState('');

  useEffect(() => {
    setCountryCode(countryCodeValue ?? '+1');
  }, [countryCodeValue]);


  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Allow only numbers
    onChange(inputValue, countryCode); // Update parent state
    if (value && !validateMobile(value, countryCode)) {
      setErrors('Invalid mobile number for the selected country.');
    } else {
      setErrors('');
    }
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
    onChange('', countryCode); // Reset mobile number when country changes
  };



  return (
    <div>
      <label className="block text-sm font-medium text-white">Mobile</label>
      <div className="flex gap-2">
        {/* Country Code Dropdown */}
        <select
          value={countryCode}
          defaultValue={countryCodeValue}
          onChange={handleCountryCodeChange}
          className="mt-1 block w-2/4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {countryCodes.map((country) => (
            <option className='bg-purple-500' key={country.code} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}
        </select>

        {/* Mobile Number Input */}
        <input
          type="text"
          value={value}
          onChange={handleMobileChange}
          className={`mt-1 block w-3/4 p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 ${error ? 'border-red-500' : 'border-white/30'
            }`}
          placeholder="Enter mobile number"
        />
      </div>
      {errors && <p className="text-red-300 text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default MobileInput;