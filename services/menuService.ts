import axios from 'axios';
import { MenuItem, PaginatedResponseMenuItem } from '@/types/menuTypes'; // Define these types as needed

// Define the base API URL
const API_URL = process.env.NEXT_PUBLIC_BE_URL;

const menuService = {
    // Create a new menu item
    createMenuItem: async (menuItemData: Omit<MenuItem, '_id'>): Promise<MenuItem> => {
        try {
            const response = await axios.post<MenuItem>(`${API_URL}/menu`, menuItemData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Update an existing menu item
    updateMenuItem: async (id: string, menuItemData: Partial<MenuItem>): Promise<MenuItem> => {
        try {
            const response = await axios.put<MenuItem>(`${API_URL}/menu/${id}`, menuItemData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Delete a menu item
    deleteMenuItem: async (id: string): Promise<any> => {
        try {
            const response = await axios.delete(`${API_URL}/menu/${id}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    // Get paginated menu items
    getMenuItems: async (
        page: number = 1,
        limit: number = 10
    ): Promise<PaginatedResponseMenuItem> => {
        try {
            const response = await axios.get<PaginatedResponseMenuItem>(`${API_URL}/menu`, {
                params: { page, limit },
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },
};

export default menuService;