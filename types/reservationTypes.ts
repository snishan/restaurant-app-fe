export interface Reservation {
    _id?: string;
    customerId: string;
    date: string;
    time: string;
    guestCount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    name?: string;
    guests?: number;
}

export interface Customer {
    _id: string;
    name: string;
}

export interface ReservationResponse {
    _id: string;
    customerId: Customer; // Embedded customer details
    date: string; // ISO date string
    time: string; // Time in "HH:mm" format
    guestCount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number; // Version key from MongoDB
}

export interface PaginatedResponseReservation {
    data: ReservationResponse[];
    total: number;
    page: number;
    pages: number;
}