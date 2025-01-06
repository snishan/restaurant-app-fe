import { PaginatedResponseReservation, Reservation } from '@/types/reservationTypes';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BE_URL;

const reservationService = {
    // Create a new reservation
    createReservation: async (reservationData: Omit<Reservation, '_id'>): Promise<Reservation> => {
        try {
            const response = await axios.post<Reservation>(`${API_URL}/reservations`, reservationData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Update an existing reservation
    updateReservation: async (id: string, reservationData: Partial<Reservation>): Promise<Reservation> => {
        try {
            const response = await axios.put<Reservation>(`${API_URL}/reservations/${id}`, reservationData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Delete a reservation
    deleteReservation: async (id: string): Promise<any> => {
        try {
            const response = await axios.delete(`${API_URL}/reservations/${id}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Get paginated reservations
    getReservations: async (
        page: number = 1,
        limit: number = 10,
        customerName?: string,
        date?: string
    ): Promise<PaginatedResponseReservation> => {
        try {
            const response = await axios.get<PaginatedResponseReservation>(`${API_URL}/reservations`, {
                params: { page, limit, customerName, date },
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },
};

export default reservationService;