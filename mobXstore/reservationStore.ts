import { makeAutoObservable } from "mobx";
import { Reservation, ReservationResponse } from "@/types/reservationTypes";
import reservationService from "@/services/reservationService";
import { toast } from "@/components/ui/toaster";

class reservationStore {

  reservationList: ReservationResponse[] = [];
  reservationListCopy: ReservationResponse[] = [];
  reservationToEdit: ReservationResponse | undefined = undefined;
  loading = false;
  searchQuery = '';
  isModalOpen = false;
  modalTitle = '';
  currentPage = 1;
  totalPages = 1;
  isDeleteModalOpen: boolean = false;
  reservationToDelete: string | undefined;



  constructor() {
    makeAutoObservable(this);
  }

  fetchReservations = async (page: number) => {
    this.loading = true;
    try {
      const response = await reservationService.getReservations(page);
      this.reservationList = response.data;
      this.reservationListCopy = response.data;
      this.loading = false;
      this.totalPages = response.pages;
      this.currentPage = response.page;
    } catch (error) {
      toast('error', 'Error!', 'Failed to fetch reservations.');
      this.loading = false;
    }
  }

  setSearchQuery = (term: string) => {
    this.searchQuery = term;
    if (term === '') {
      this.reservationList = this.reservationListCopy;
    } else {
      this.reservationList = this.reservationListCopy.filter((customer) =>
        customer.customerId.name.toLowerCase().includes(term)
      ).map((customer) => ({ ...customer }));

    }
  }
  handleCreateNew = () => {
    this.isModalOpen = true;
    this.modalTitle = 'Add Reservation';
  }

  editReservation = (reservationId: string) => {
    this.reservationToEdit = this.reservationList.find((reservation) => reservation._id === reservationId);
    this.isModalOpen = true;
    this.modalTitle = 'Update Reservation';
  }

  handleDelete = (id: string) => {
    this.reservationList = this.reservationList.filter((reservation) => reservation._id !== id);
  }

  handleModalClose = () => {
    this.isModalOpen = false;
  }

  handleAddReservation = async (reservation: any) => {
    this.loading = true;
    try {
      const params: Reservation = {
        customerId: reservation.customerId,
        date: reservation.date,
        time: reservation.time,
        guestCount: reservation.guestCount,
        status: 'pending',
      };
      await reservationService.createReservation(params);
      toast('success', 'Success!', 'Customer registered successfully.');
      this.fetchReservations(this.currentPage);
    } catch (error) {
      toast('error', 'Error!', 'Customer registration failed.');
      this.fetchReservations(this.currentPage);
    }
  }

  handlePageChange = (page: number) => {
    this.currentPage = page;
    this.fetchReservations(page);
  }
  openDeleteModal = (id: string) => {
    this.isDeleteModalOpen = true;
    this.reservationToDelete = this.reservationList.find((reservation) => reservation._id === id)?._id;
  }
  updateReservation = async (reservation: any) => {
    this.loading = true;
    try {
      const params: Reservation = {
        customerId: reservation.customerId,
        date: reservation.date,
        time: reservation.time,
        guestCount: reservation.guestCount,
        status: reservation.status,
        _id: reservation._id
      };
      await reservationService.updateReservation(reservation._id, params);
      toast('success', 'Success!', 'Reservation updated successfully.');
      this.fetchReservations(this.currentPage);
    } catch (error) {
      toast('error', 'Error!', 'Reservation updated failed.');
      this.fetchReservations(this.currentPage);
    }
  }
  closeDeleteModal = () => {
    this.isDeleteModalOpen = false;
    this.reservationToDelete = undefined;
  }
  deleteReservation = async (id: string) => {
    if (!id) return;
    this.loading = true;
    try {
      await reservationService.deleteReservation(id);
      toast('success', 'Success!', 'Reservation deleted successfully.');
      this.fetchReservations(this.currentPage);
    } catch (error) {
      toast('error', 'Error!', 'Reservation deletion failed.');
      this.fetchReservations(this.currentPage);
    } finally {
      this.isDeleteModalOpen = false;
      this.reservationToDelete = undefined;
    }
  }
}
export default new reservationStore();