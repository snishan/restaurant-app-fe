import { makeAutoObservable, runInAction } from 'mobx';
import { MenuItem } from '@/types/menuTypes';
import axios from 'axios';
import menuService from '@/services/menuService';
import { toast } from '@/components/ui/toaster';

class MenuStore {
  menu: MenuItem[] = [];
  loading: boolean = false;
  openCreateModal: boolean = false;
  modalTitle: string = '';
  menuToEdit: MenuItem | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  isDeleteModalOpen: boolean = false;
  menuToDelete: string | undefined;


  constructor() {
    makeAutoObservable(this);
  }

  async fetchMenu() {
    this.loading = true;
    try {
      runInAction(async () => {
        await menuService.getMenuItems(1).then((data) => {
          this.menu = data.data;
          this.currentPage = data.page;
          this.totalPages = data.pages;
        });
        this.openCreateModal = false;
      });

      this.loading = false;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  handleCreateNew = () => {
    this.openCreateModal = true;
    this.modalTitle = 'Add a Menu';
    this.menuToEdit = null;
  };

  // Upload image to Imgur
  uploadImageToCloudinary = async (imageFile: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append('file', imageFile);
    if (uploadPreset && apiKey) {
      formData.append('upload_preset', uploadPreset);
      formData.append('api_key', apiKey);
    }

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const imageUrl = (response.data as { secure_url: string }).secure_url;
      return imageUrl;
    } catch (error) {
      throw error;
    }
  };

  // Add a new menu item
  handleAddMenu = async (menu: MenuItem, imageFile?: File) => {
    try {
      if (imageFile) {
        // Upload the image to Imgur and get the URL
        const imageUrl = await this.uploadImageToCloudinary(imageFile);
        menu.image = imageUrl; // Update the menu item with the new image URL
      }
      // Add the menu item to the store
      runInAction(async () => {
        await menuService.createMenuItem(menu).then((data) => {
          toast('success', 'Success!', 'Menu added successfully.');
          this.fetchMenu();
        });
        this.openCreateModal = false;
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  // Update an existing menu item
  handleUpdateMenu = async (menu: MenuItem, imageFile?: File) => {
    try {
      if (imageFile) {
        const imageUrl = await this.uploadImageToCloudinary(imageFile);
        menu.image = imageUrl; // Update the menu item with the new image URL
      }

      runInAction(async () => {
        try {
          await menuService.updateMenuItem(menu._id!, menu);
          toast('success', 'Success!', 'Menu updated successfully.');
          this.fetchMenu();
        } catch (error) {
          toast('error', 'Error!', 'Menu update failed.');
          this.fetchMenu();
        }
        this.openCreateModal = false;
      });

    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };
  handleDeleteItem = async (id: string) => {
    this.isDeleteModalOpen = true;
    this.menuToDelete = id;
  }


  deleteMenu = async (id: string | undefined) => {
    if (!id) return;
    this.loading = true;
    try {
      await menuService.deleteMenuItem(id).then((data) => {
        toast('success', 'Success!', 'Menu deleted successfully.');
        this.fetchMenu();
      });
    } catch (error) {
      toast('error', 'Error!', 'Menu deletion failed.');
      this.fetchMenu();
    } finally {
      this.isDeleteModalOpen = false;
      this.menuToDelete = undefined;
    }
  }

  closeDeleteModal = () => {
    this.isDeleteModalOpen = false;
    this.menuToDelete = undefined;
  }

  handleUpdateItem = (id: string) => {
    this.openCreateModal = true;
    this.modalTitle = 'Update Menu';
    this.menuToEdit = this.menu.find((item) => item._id === id) || null;
  }
}

export default new MenuStore();