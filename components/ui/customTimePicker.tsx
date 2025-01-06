import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomTimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  className?: string;
  error?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  selected,
  onChange,
  placeholderText = 'Select time',
  className = '',
  error,
}) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15} // 15-minute intervals
        timeCaption="Time"
        dateFormat="h:mm aa" // Format: 12-hour clock with AM/PM
        placeholderText={placeholderText}
        className={`mt-1 block w-full r p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 ${
          error ? 'border-red-500' : 'border-white/30'
        } ${className}`}
        wrapperClassName="w-full"
        popperClassName="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] rounded-lg shadow-lg"
        calendarClassName="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] text-white rounded-lg p-4"
        timeClassName={() => 'hover:bg-white/20 rounded-md w-full text-s p-1'}
        // Custom styles for dropdowns
        renderCustomHeader={() => (
          <div className="flex justify-center items-center p-4 bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] rounded-t-lg">
            <span className="text-white text-lg font-medium">Select Time</span>
          </div>
        )}
      />
      {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTimePicker;