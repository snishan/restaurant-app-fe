import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  className?: string;
  error?: string;
  isFromReservation?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
  placeholderText = 'Select date',
  className = '',
  error,
  isFromReservation
}) => {
  // Custom header for the date picker
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    decreaseYear: () => void;
    increaseYear: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
    prevYearButtonDisabled: boolean;
    nextYearButtonDisabled: boolean;
  }) => {
    return (
      <div className="flex justify-between items-center p-4  bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] rounded-t-lg">
        {/* Previous Year Button */}
        <button
          onClick={decreaseYear}
          disabled={prevYearButtonDisabled}
          className="text-white hover:bg-white/20 p-1 rounded-md"
        >
          {'<<'}
        </button>

        {/* Previous Month Button */}
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="text-white hover:bg-white/20 p-1 rounded-md"
        >
          {'<'}
        </button>

        {/* Current Month and Year */}
        <span className="text-white text-lg font-medium">
          {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>

        {/* Next Month Button */}
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="text-white hover:bg-white/20 p-1 rounded-md"
        >
          {'>'}
        </button>

        {/* Next Year Button */}
        <button
          onClick={increaseYear}
          disabled={nextYearButtonDisabled}
          className="text-white hover:bg-white/20 p-1 rounded-md"
        >
          {'>>'}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full">
      <DatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        className={`mt-1 block w-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 ${
          error ? 'border-red-500' : 'border-white/30'
        } ${className}`}
        wrapperClassName="w-full"
        popperClassName="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] rounded-lg bg-red shadow-lg"
        calendarClassName="bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] text-white bg-red rounded-lg p-4"
        dayClassName={() => 'hover:bg-white/20 rounded-md text-lg'}
        monthClassName={() => 'text-white text-lg'}
        weekDayClassName={() => 'text-white text-lg'}
        yearDropdownItemNumber={10}
        showYearDropdown={true}
        showMonthDropdown
        dropdownMode="select"
        minDate={isFromReservation?new Date():undefined}
        maxDate={isFromReservation?undefined:new Date()}
        renderCustomHeader={renderCustomHeader} // Add custom header
        // Custom styles for dropdowns
        renderMonthContent={(month) => (
          <div className="text-white text-lg">{month}</div>
        )}
        renderYearContent={(year) => (
          <div className="text-white text-lg">{year}</div>
        )}
      />
      {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;