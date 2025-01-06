import { makeAutoObservable, runInAction } from 'mobx';
import customerService from '@/services/customerService';
import { toast } from '@/components/ui/toaster';


class CustomerStore {
  customers: Customer[] = [];
  customersCopy: Customer[] = [];
  searchTerm: string = '';
  isModalOpen: boolean = false;
  modalTitle: string = '';
  customerToEdit: Customer | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  loader: boolean = false;
  isDeleteModalOpen: boolean = false;
  customerToDelete: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch customers
   fetchCustomers = async(page: number) =>{
    this.loader = true;
    try {
      const response = await customerService.getCustomers(page);
      runInAction(() => {
        this.customers = response.data;
        this.customersCopy = response.data;
        this.totalPages = response.pages??1;
        this.currentPage = response.page;
        this.loader = false;
      });
    } catch (error) {
      toast('error', 'Error!', 'Failed to fetch customers.');
      this.loader = false;
    }
  }

  // Handle search
  handleSearch=(term: string)=> {
    this.searchTerm = term;
    if (term === '') {
      this.customers = this.customersCopy;
    } else {
      this.customers = this.customersCopy.filter((customer) =>
        customer.name.toLowerCase().includes(term)
      );
    }
  }

  // Add customer
  addCustomer= async (newCustomer: { name: string; mobile: string; birthday: string; countryCode: string })=> {
    this.loader = true;
    try {
      const params: Customer = {
        name: newCustomer.name,
        telephone: newCustomer.mobile,
        birthday: newCustomer.birthday,
        countryCode: newCustomer.countryCode,
      };
      await customerService.createCustomer(params);
      toast('success', 'Success!', 'Customer registered successfully.');
      this.fetchCustomers(this.currentPage);
    } catch (error) {
      toast('error', 'Error!', 'Customer registration failed.');
      this.fetchCustomers(this.currentPage);
    }
  }

  // Edit customer
  editCustomer=(customer: Customer)=> {
    this.isModalOpen = true;
    this.modalTitle = 'Update Customer';
    this.customerToEdit = customer;
  }

  // Update customer
  updateCustomer= async(updatedCustomer: any)=> {
    this.loader = true;
    try {
      await customerService.updateCustomer(updatedCustomer.id ?? 0, updatedCustomer);
      toast('success', 'Success!', 'Customer updated successfully.');
      this.fetchCustomers(this.currentPage);
    } catch (error) {
      toast('error', 'Error!', 'Customer update failed.');
      this.fetchCustomers(this.currentPage);
    }
  }

  // Delete customer
  deleteCustomer= async(customerId: string | undefined) =>{
    if (!customerId) return;
    this.loader = true;
    try {
      await customerService.deleteCustomer(customerId);
      toast('success', 'Success!', 'Customer deleted successfully.');
      this.fetchCustomers(this.currentPage);
    } catch (error) {
      toast('error', 'Error!', 'Customer deletion failed.');
      this.fetchCustomers(this.currentPage);
    } finally {
      this.isDeleteModalOpen = false;
      this.customerToDelete = undefined;
    }
  }

  // Open delete modal
  openDeleteModal=(customerId: string | undefined) =>{
    this.customerToDelete = customerId;
    this.isDeleteModalOpen = true;
  }

  // Close delete modal
  closeDeleteModal=()=> {
    this.isDeleteModalOpen = false;
    this.customerToDelete = undefined;
  }

  // Handle page change
  handlePageChange=(page: number)=> {
    this.currentPage = page;
    this.fetchCustomers(page);
  }
}

export default new CustomerStore();