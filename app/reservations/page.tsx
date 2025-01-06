'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Edit, Search, Trash, UserPlus } from 'lucide-react';
import Loader from '@/components/ui/loader';
import { useObserver } from 'mobx-react-lite';
import reservationStore from '@/mobXstore/reservationStore';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import AddReservationForm from '@/components/reservation/AddReservationForm';
import { ReservationResponse } from '@/types/reservationTypes';
import moment from 'moment';
import { Pagination } from '@/components/ui/pagination';
import { isEmpty } from 'lodash';

const ReservationsPage = () => useObserver(() => {

  const {
    reservationList,
    loading,
    isModalOpen,
    modalTitle,
    searchQuery,
    currentPage,
    totalPages,
    reservationToEdit,
    isDeleteModalOpen,
    reservationToDelete,
    closeDeleteModal,
    handlePageChange,
    setSearchQuery,
    handleCreateNew,
    handleAddReservation,
    fetchReservations,
    editReservation,
    openDeleteModal,
    updateReservation,
    deleteReservation,
  } = reservationStore;

  useEffect(() => {
    fetchReservations(1);
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Reservations</h1>

      {/* Search Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className=" relative flex-1 gap-4 items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by customer name..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleCreateNew}
            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            <UserPlus size={20} className="mr-2" />
            Add Reservation
          </Button>
        </div>
      </div>


      {/* Reservations Table */}
      <div className="rounded-lg shadow overflow-x-auto">
        <Table className='bg-white/50 backdrop-blur'>
          <TableHeader className='bg-white backdrop-blur-sm'>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservationList.map((reservation: ReservationResponse) => (
              <TableRow key={reservation?._id}>
                <TableCell>{reservation.customerId.name}</TableCell>
                <TableCell>{moment(reservation.date).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.guestCount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm capitalize ${reservation.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : reservation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {reservation.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit onClick={() => editReservation(reservation._id)} size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash onClick={() => openDeleteModal(reservation._id?.toString())} size={20} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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

      {/* Add Reservation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => (reservationStore.isModalOpen = false)} title={modalTitle}>
        <AddReservationForm
          onClose={() => (reservationStore.isModalOpen = false)}
          onAddReservation={handleAddReservation}
          onUpdateReservation={updateReservation}
          reservation={reservationToEdit}
          isEdit={!isEmpty(reservationToEdit)}
        />
      </Modal>

      {/* Delete Customer Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Delete Reservation">
        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this reservation?</p>
          <div className="flex justify-end gap-4">
            <Button onClick={closeDeleteModal} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-gray-300 rounded-lg">
              Cancel
            </Button>
            <Button onClick={() => deleteReservation(reservationToDelete ?? '')} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default ReservationsPage;