'use client';
import React, { useEffect } from 'react';
import { Search, UserPlus, Edit, Trash } from 'lucide-react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import customerStore from '@/mobXstore/customerStore';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import Modal from '@/components/ui/modal';
import AddCustomerForm from '@/components/customers/AddCustomerForm';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import Loader from '@/components/ui/loader';

const CustomerManagement = observer(() => {
  const {
    customers,
    searchTerm,
    isModalOpen,
    modalTitle,
    customerToEdit,
    currentPage,
    totalPages,
    loader,
    isDeleteModalOpen,
    customerToDelete,
    fetchCustomers,
    handleSearch,
    addCustomer,
    editCustomer,
    updateCustomer,
    openDeleteModal,
    closeDeleteModal,
    deleteCustomer,
    handlePageChange,
  } = customerStore;

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const handleCreateNew = () => {
    customerStore.isModalOpen = true;
    customerStore.modalTitle = 'Add Customer';
    customerStore.customerToEdit = null;
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-50 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleCreateNew}
            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            <UserPlus size={20} className="mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="rounded-lg shadow overflow-x-auto">
        <Table className="bg-white/50 backdrop-blur">
          <TableHeader className="bg-white backdrop-blur-sm">
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Birthday</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty(customers) ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4 text-cyan-800 text-lg">
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer:any) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{(customer.countryCode ?? '') + ' ' + customer.telephone}</TableCell>
                  <TableCell>{moment(customer.birthday).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit onClick={() => editCustomer(customer)} size={20} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash onClick={() => openDeleteModal(customer._id?.toString())} size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Customer Modal */}
      <Modal isOpen={isModalOpen} onClose={() => (customerStore.isModalOpen = false)} title={modalTitle}>
        <AddCustomerForm
          onClose={() => (customerStore.isModalOpen = false)}
          onUpdateCustomer={updateCustomer}
          customer={{
            id: customerToEdit?._id?.toString() ?? '',
            name: customerToEdit?.name ?? '',
            mobile: customerToEdit?.telephone ?? '',
            birthday: customerToEdit?.birthday ?? '',
            countryCode: customerToEdit?.countryCode ?? '',
          }}
          isEdit={!isEmpty(customerToEdit)}
          onAddCustomer={addCustomer}
        />
      </Modal>

      {/* Delete Customer Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Delete Customer">
        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this customer?</p>
          <div className="flex justify-end gap-4">
            <Button onClick={closeDeleteModal} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-gray-300 rounded-lg">
              Cancel
            </Button>
            <Button onClick={() => deleteCustomer(customerToDelete)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default CustomerManagement;