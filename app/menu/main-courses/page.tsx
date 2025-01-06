'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from '@/components/ui/loader';
import  menuStore  from '@/mobXstore/menuStore';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import Modal from '@/components/ui/modal';
import AddMenuForm from '@/components/menu/AddMenuForm';
import { isEmpty } from 'lodash';
import { FaTrash, FaEdit } from 'react-icons/fa';


const MenuPageMain = observer(() => {
  const {
    menu,
    loading,
    openCreateModal,
    modalTitle,
    menuToEdit,
    isDeleteModalOpen,
    menuToDelete,
    closeDeleteModal,
    handleCreateNew,
    handleAddMenu,
    handleUpdateMenu,
    handleDeleteItem,
    deleteMenu,
    handleUpdateItem,
  } = menuStore;

  useEffect(() => {
    menuStore.fetchMenu(); // Fetch menu data when the component mounts
  }, []);

  if (loading) {
    return <Loader />;
  }


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">{'Main Courses'}</h2>
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={handleCreateNew}
              className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              <UserPlus size={20} className="mr-2" />
              Add a Menu
            </Button>
          </div>
        </div>

        {isEmpty(menu.filter((data) => data?.category === 'Main Courses')) && (
          <div className="flex flex-col items-center justify-center p-8 bg-white/50 rounded-lg">
            {/* Message */}
            <p className="text-xl font-semibold text-gray-700">No Data Available</p>
            <p className="text-sm text-gray-500">Please add some items to the "Main Courses" category.</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menu
            .filter((data) => data?.category === 'Main Courses').map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
                <LazyLoadImage
                  src={item?.image}
                  alt={item.name}
                  className="w-full h-48 object-cover object-center"
                  effect="blur"
                  width={510}
                  placeholderSrc="path-to-placeholder-image.jpg" // Optional: Add a placeholder image
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-end gap-2 p-4 border-t">
                  <button
                    onClick={() => handleUpdateItem(item._id!)} // Handle update
                    className="p-2 text-blue-500 hover:text-blue-700"
                    aria-label="Update"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item._id!)} // Handle delete
                    className="p-2 text-red-500 hover:text-red-700"
                    aria-label="Delete"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Reservation Modal */}
      <Modal isOpen={openCreateModal} onClose={() => (menuStore.openCreateModal = false)} title={modalTitle}>
        <AddMenuForm
          onClose={() => (menuStore.openCreateModal = false)}
          onAddMenu={handleAddMenu}
          onUpdateMenu={handleUpdateMenu}
          menu={menuToEdit || undefined}
          isEdit={!isEmpty(menuToEdit)}
          fromPage='Main Courses'
        />
      </Modal>

      {/* Delete Customer Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Delete Menu">
        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this menu?</p>
          <div className="flex justify-end gap-4">
            <Button onClick={closeDeleteModal} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-gray-300 rounded-lg">
              Cancel
            </Button>
            <Button onClick={() => deleteMenu(menuToDelete)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default MenuPageMain;
