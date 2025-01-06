
// Define the Customer interface
interface Customer {
    _id?: number; // Optional because it might not exist for new customers
    name: string;
    email?: string;
    totalOrders?: number;
    totalSpent?: number;
    lastVisit?: string;
    status?: string;
    birthday?: string;
    telephone?: string;
    countryCode?: string;
  }
  
  // Define the response structure for paginated customers
  interface PaginatedResponse {
    data: Customer[];
    total: number;
    page: number;
    limit: number;
    pages?: number;
  }
  
  // Define the response structure for dropdown data
  interface DropdownResponse {
    _id: number;
    name: string;
  }
  