import React, { useState, useEffect } from 'react';
import ModalButton from '../ui/modalButton';
import moment from 'moment';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import CustomDatePicker from '../ui/customDatePicker';
import CustomTimePicker from '../ui/customTimePicker';
import { Input } from '../ui/input';
import customerService from '@/services/customerService';
import { Reservation, ReservationResponse } from '@/types/reservationTypes';


interface AddReservationFormProps {
    onClose: () => void;
    onAddReservation: (reservation: Reservation) => void;
    onUpdateReservation?: (reservation: Reservation) => void; 
    reservation?: ReservationResponse; 
    isEdit?: boolean; 
}

const AddReservationForm: React.FC<AddReservationFormProps> = ({
    onClose,
    onAddReservation,
    onUpdateReservation,
    reservation,
    isEdit = false,
}) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [guestCount, setGuestCount] = useState<number | undefined>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');
    const [customers, setCustomers] = useState<DropdownResponse[]>([]);
    const [status, setStatus] = useState<"pending" | "confirmed" | "cancelled">('pending');

    // Fetch customers data
    useEffect(() => {
        const fetchCustomers = async () => {
            customerService.getCustomerDropdown().then((response) => {
                setCustomers(response);
             });     
        };

        fetchCustomers();
    }, []);

    // Pre-fill the form if in edit mode
    useEffect(() => {
        if (isEdit && reservation) {
            setName(reservation.customerId.name);
            setDate(reservation.date);
            setSelectedTime(reservation.time);
            setGuestCount(reservation.guestCount!);
            setSelectedCustomer(reservation.customerId.name);
            setStatus(reservation.status);
        }
        
    }, [isEdit, reservation]);

    // Validate the form
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = 'Name is required';
        if (!date.trim()) newErrors.date = 'Date is required';
        if (!selectedTime) newErrors.time = 'Time is required';
        if (!guestCount) newErrors.guestCount = 'Guest count is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const reservationData: Reservation = {
                _id: reservation ? reservation._id : '', 
                name,
                date,
                time: selectedTime || '',
                guestCount: guestCount || 0,
                status: isEdit?status:'pending', 
                customerId: String(customers.find((customer) => customer.name === name)?._id || ''),
                guests: guestCount || 0, 
            };

            if (isEdit && onUpdateReservation) {
                onUpdateReservation(reservationData); 
            } else {
                onAddReservation(reservationData); 
            }

            onClose(); 
        }
    };

    // Handle customer selection
    const onCustomerChange = (value: string) => {
        if (!value) return;
        setSelectedCustomer(value);
        setName(value);
    };

    const onStatusChange = (value: "pending" | "confirmed" | "cancelled") => {
        if (!value) return;
        setStatus(value);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div>
                <label className="block text-sm font-medium text-white">Customer Name</label>
                <Select value={selectedCustomer} defaultValue={name} onValueChange={(value)=>onCustomerChange(value)}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                        {customers.map((customer) => (
                            <SelectItem key={customer._id} value={customer.name}>
                                {customer.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Date and Time */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-white">Date</label>
                    <CustomDatePicker
                        selected={date ? new Date(date) : null}
                        onChange={(date) => {
                            setDate(date ? moment(date).format('YYYY-MM-DD') : '');
                            setErrors({ ...errors, date: '' }); // Clear error when date is selected
                        }}
                        placeholderText="Select date"
                        error={errors.date}
                        isFromReservation={true}
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-white">Time</label>
                    <CustomTimePicker
                        selected={selectedTime ? moment(selectedTime, 'HH:mm').toDate() : null}
                        onChange={(time) => {
                            setSelectedTime(time ? moment(time).format('HH:mm A') : null);
                            setErrors({ ...errors, time: '' }); 
                        }}
                        placeholderText="Choose a time"
                        error={errors.time}
                    />
                </div>
            </div>

            {/* Guest Count */}
            <div>
                <label className="block text-sm font-medium text-white">Guest Count</label>
                <Input
                    type="number"
                    value={guestCount}
                    onChange={(e) => {
                        setGuestCount(Number(e.target.value));
                        setErrors({ ...errors, guestCount: '' }); 
                    }}
                    className={`mt-1 block w-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 `}
                    placeholder="Enter guest count"
                />
                {errors.guestCount && <p className="text-red-300 text-sm mt-1">{errors.guestCount}</p>}
            </div>
            {isEdit && <div>
                <label className="block text-sm font-medium text-white">Status</label>
                <Select value={status} defaultValue={status} onValueChange={(value)=>onStatusChange(value as "pending" | "confirmed" | "cancelled")}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                        {['pending','confirmed','cancelled'].map((data) => (
                            <SelectItem key={data} value={data}>
                                <p className='capitalize'>{data}</p>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
            </div>}

            {/* Buttons */}
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
                    {isEdit ? 'Update Reservation' : 'Add Reservation'}
                </ModalButton>
            </div>
        </form>
    );
};

export default AddReservationForm;