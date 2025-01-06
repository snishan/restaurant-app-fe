import React, { useState } from 'react';
import ModalButton from '../ui/modalButton';
import { Input } from '../ui/input';
import { MenuItem } from '@/types/menuTypes';
import { FaTimes } from 'react-icons/fa'; // Import the remove icon
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AddMenuFormProps {
    onClose: () => void;
    onAddMenu: (menu: MenuItem, imageFile?: File) => void;
    onUpdateMenu?: (menu: MenuItem, imageFile?: File) => void;
    menu?: MenuItem;
    isEdit?: boolean;
    fromPage?: "Starters" | "Main Courses";
}

const AddMenuForm: React.FC<AddMenuFormProps> = ({
    onClose,
    onAddMenu,
    onUpdateMenu,
    menu,
    isEdit = false,
    fromPage,
}) => {
    const [name, setName] = useState(menu?.name || '');
    const [description, setDescription] = useState(menu?.description || '');
    const [price, setPrice] = useState(menu?.price ?? undefined);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(menu?.image || '');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<"Starters" | "Main Courses">(fromPage ?? 'Starters');

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    // Handle image removal
    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview('');
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = ''; 
        }
    };

    // Validate the form
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = 'Name is required';
        if (!description.trim()) newErrors.description = 'Description is required';
        if ((price ?? 0) <= 0) newErrors.price = 'Price must be greater than 0';
        if (!image && !imagePreview) newErrors.image = 'Image is required';
        if (!status) newErrors.status = 'Category is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const menuData: MenuItem = {
                _id: menu?._id || undefined, 
                name,
                description,
                price: price || 0,
                image: imagePreview, 
                category: status
            };

            if (isEdit && onUpdateMenu) {
                onUpdateMenu(menuData, image || undefined); 
            } else {
                onAddMenu(menuData, image || undefined); 
            }

            onClose();
        }
    };

    const onStatusChange = (value: "Starters" | 'Main Courses') => {
        if (!value) return;
        setStatus(value);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}

            <div className="flex flex-col items-center gap-4">
                {/* Image Preview or Dummy Image */}
                <div className="relative w-full h-32 rounded-md overflow-hidden">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Menu Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/500"
                            alt="Dummy Image"
                            className="w-full h-full object-cover"
                        />
                    )}
                    {imagePreview && (
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-1 right-1 p-1 bg-white/50 rounded-full hover:bg-white/70"
                        >
                            <FaTimes className="text-red-500" />
                        </button>
                    )}
                </div>

                {/* Upload Button */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white hover:bg-white/30"
                    >
                        Upload Image
                    </label>
                </div>

                {/* Error Message */}
                {errors.image && <p className="text-red-300 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-white">Name</label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors({ ...errors, name: '' }); // Clear error when name is entered
                    }}
                    className={`mt-1 block w-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.name ? 'border-red-500' : 'border-white/30'
                        }`}
                    placeholder="Enter menu item name"
                />
                {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Price */}
            <div className='flex gap-4'>
                <div className='w-1/2'>
                    <label className="block text-sm font-medium text-white">Price</label>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => {
                            setPrice(Number(e.target.value));
                            setErrors({ ...errors, price: '' }); // Clear error when price is entered
                        }}
                        className={`mt-1 block w-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.price ? 'border-red-500' : 'border-white/30'
                            }`}
                        placeholder="Enter menu item price"
                    />
                    {errors.price && <p className="text-red-300 text-sm mt-1">{errors.price}</p>}
                </div>
                <div className='w-1/2'>
                    <label className="block text-sm font-medium text-white">Category</label>
                    <Select value={status} defaultValue={status} onValueChange={(value) => onStatusChange(value as "Starters" | 'Main Courses')}>
                        <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {['Starters', 'Main Courses'].map((data) => (
                                <SelectItem key={data} value={data}>
                                    <p className='capitalize'>{data}</p>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.status && <p className="text-red-300 text-sm mt-1">{errors.status}</p>}
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-white">Description</label>
                <Input
                    type="textarea"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors({ ...errors, description: '' }); // Clear error when description is entered
                    }}
                    className={`mt-1 block w-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.description ? 'border-red-500' : 'border-white/30'
                        }`}
                    placeholder="Enter menu item description"
                />
                {errors.description && <p className="text-red-300 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
                <ModalButton
                    type="button"
                    onClick={onClose}
                    className="bg-white/10 hover:bg-white/20"
                >
                    Cancel
                </ModalButton>
                <ModalButton
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600"
                >
                    {isEdit ? 'Update a Menu' : 'Add a Menu'}
                </ModalButton>
            </div>
        </form>
    );
};

export default AddMenuForm;