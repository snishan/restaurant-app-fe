import axios from 'axios';

// Define the base API URL
const API_URL = process.env.NEXT_PUBLIC_BE_URL;

const customerService = {
  // Create a new customer
  createCustomer: async (customerData: Omit<Customer, 'id'>): Promise<Customer> => {
    try {
      const response: AxiosResponse<Customer> = await axios.post(`${API_URL}/customers`, customerData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Update existing customer
  updateCustomer: async (id: number, customerData: Partial<Customer>): Promise<Customer> => {
    try {
      const response: AxiosResponse<Customer> = await axios.put(`${API_URL}/customers/${id}`, customerData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Delete customer
  deleteCustomer: async (id: string): Promise<void> => {
    try {
      const response: AxiosResponse<void> = await axios.delete(`${API_URL}/customers/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Get paginated customers
  getCustomers: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse> => {
    try {
      const response: AxiosResponse<PaginatedResponse> = await axios.get(`${API_URL}/customers`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Get customer dropdown data
  getCustomerDropdown: async (): Promise<DropdownResponse[]> => {
    try {
      const response: AxiosResponse<DropdownResponse[]> = await axios.get(`${API_URL}/customers/dropdown`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};

export default customerService;