import React, { useState, useEffect } from 'react';
import ModalButton from '../ui/modalButton';
import moment from 'moment';
import MobileInput from '../ui/mobileInput';
import CustomDatePicker from '../ui/customDatePicker';

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  birthday: string;
  countryCode: string;
}

interface AddCustomerFormProps {
  onClose: () => void;
  onAddCustomer: (customer: Customer) => void;
  onUpdateCustomer?: (customer: Customer) => void;
  customer?: Customer;
  isEdit?: boolean;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({
  onClose,
  onAddCustomer,
  onUpdateCustomer,
  customer,
  isEdit = false,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countryCode, setCountryCode] = useState('+1');

  // Pre-fill the form if in edit mode
  useEffect(() => {
    if (isEdit && customer) {
      setName(customer.name);
      setMobile(customer.mobile);
      setBirthday(moment(customer.birthday).format('YYYY-MM-DD'));
      setCountryCode(customer.countryCode);
    }
  }, [isEdit, customer]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!birthday.trim()) newErrors.birthday = 'Birthday is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const customerData = {
        id: customer ? customer.id : new Date().getTime().toString(),
        name,
        mobile: mobile,
        birthday,
        countryCode,
      };

      if (isEdit && onUpdateCustomer) {
        onUpdateCustomer(customerData); // Call update function
      } else {
        onAddCustomer(customerData); // Call add function
      }

      onClose();
    }
  };

  function handleMobile(value: string, countryCode: string): void {
    setMobile(value);
    setCountryCode(countryCode)
    setErrors({ ...errors, mobile: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1 block w-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.name ? 'border-red-500' : 'border-white/30'
            }`}
          placeholder="Enter name"
        />
        {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <MobileInput
          value={mobile}
          onChange={(value, countryCode) => handleMobile(value, countryCode)}
          error={errors.mobile}
          countryCodeValue={countryCode}
        />
        {errors.mobile && <p className="text-red-300 text-sm mt-1">{errors.mobile}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Birthday</label>
        <CustomDatePicker
          selected={birthday ? new Date(birthday) : null}
          onChange={(date) => {
            setBirthday(date ? moment(date).format('YYYY-MM-DD') : '');
            setErrors({ ...errors, birthday: '' }); // Clear error when date is selected
          }}
          placeholderText="Select birthday"
          error={errors.birthday}
        />
      </div>
      <div className="flex justify-end gap-2">
        <ModalButton
          type="button"
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20"
        >
          Cancel
        </ModalButton>
        <ModalButton
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          {isEdit ? 'Update Customer' : 'Add Customer'}
        </ModalButton>
      </div>
    </form>
  );
};

export default AddCustomerForm;