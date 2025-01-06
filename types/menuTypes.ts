

  export interface MenuCategory {
    id: string;
    category: string;
    items: MenuItem[];
  }
  
  export interface MenuItem {
    _id?: string; // Optional for new items
    name: string;
    description: string;
    price: number;
    image: string;
    status?: boolean; // Optional, default is true
    createdAt?: string; // Automatically added by MongoDB
    updatedAt?: string; // Automatically added by MongoDB
    category?: string;
}

export interface PaginatedResponseMenuItem {
    data: MenuItem[];
    total: number;
    page: number;
    pages: number;
}