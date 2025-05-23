import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormField from './FormField';
import SelectField from './SelectField';
import ImageCarousel from './ImageCarousel';
import {axiosInstance} from "../utils/axiosInstance.js"
import toast from 'react-hot-toast';
import {Loader2} from "lucide-react"

const ComplaintForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suboptionsVisible, setSuboptionsVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      emailId: '',
      blockNumber: '',
      flatNumber: '',
      complaintCategory: '',
      subCategory: '',
      complaintDescription: ''
    }
  });

  const complaintCategories = [
    { value: '', label: 'Select a category', disabled: true },
    { value: 'SwimmingPool', label: 'Swimming Pool' },
    { value: 'WaterSupply', label: 'Water Supply' },
    { value: 'Parking', label: 'Parking' },
    { value: 'Plumbing', label: 'Plumbing' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Lift', label: 'Lift' },
    { value: 'HouseKeeping', label: 'House Keeping' },
    { value: 'GarbageCollector', label: 'Garbage Collector' },
    { value: 'Security', label: 'Security' },
    { value: 'ClubHouse', label: 'Clubhouse' },
    { value: 'Park', label: 'Park' },
    { value: 'Generator', label: 'Generator' }
  ];

  const subCategoryOptions = {
    'Clubhouse': [
      { value: '', label: 'Select a sub-category', disabled: true },
      { value: 'Gym', label: 'Gym' },
      { value: 'Theatre', label: 'Theatre' }
    ],
    'Park': [
      { value: '', label: 'Select a sub-category', disabled: true },
      { value: 'BasketBall', label: 'BasketBall' },
      { value: 'TableTennis', label: 'Table Tennis' },
      { value: 'Swings', label: 'Swings' }
    ]
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSuboptionsVisible(['Clubhouse', 'Park'].includes(category));
  };

  const handleImageChange = (e) => {
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    console.log(files)
    setSelectedImages(prevImages => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  const onSubmit = async(data) => {
    const formData = {
      ...data,
      images: [...selectedImages]
    };

    const formDataToSend = new FormData();
    selectedImages.forEach((image, index) => {
      formDataToSend.append('gallery', image)
    })
    for(let key in formData){
      if(key === "images") continue;
      formDataToSend.append(key, formData[key]);
    }

    console.log('Form Data:', Array.from(formDataToSend.entries()));

    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/api/user/registerComplain', formDataToSend);
      if(response.data.success){
        toast.success(response.data.message);
      }
      else toast.error(response.data.message);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please refresh!');
    }finally{
      setIsLoading(false);
    }

    reset();
    setSelectedCategory('');
    setSuboptionsVisible(false);
    setSelectedImages([]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-200">
      <div className="p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Resident Complaint Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {selectedImages.length > 0 && (
            <ImageCarousel images={selectedImages} />
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 border-gray-300 dark:border-gray-600"
            />
            {selectedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 px-2 py-1 rounded-full"
                  >
                    Remove Image {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="name"
              label="Name"
              rules={{ 
                required: 'Name is required',
                validate: value => value.trim() !== '' || 'Name cannot be empty spaces'
              }}
              error={errors.name}
            />
            
            <FormField
              control={control}
              name="phoneNumber"
              label="Phone Number"
              rules={{ 
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              }}
              error={errors.phoneNumber}
            />
            
            <FormField
              control={control}
              name="emailId"
              label="Email Id"
              rules={{ 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address'
                }
              }}
              error={errors.emailId}
            />
            
            <FormField
              control={control}
              name="blockNumber"
              label="Block Number"
              rules={{ 
                required: 'Block number is required',
                validate: value => value.trim() !== '' || 'Block number cannot be empty spaces'
              }}
              error={errors.blockNumber}
            />
            
            <FormField
              control={control}
              name="flatNumber"
              label="Flat Number"
              rules={{ 
                required: 'Flat number is required',
                validate: value => value.trim() !== '' || 'Flat number cannot be empty spaces'
              }}
              error={errors.flatNumber}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              control={control}
              name="complaintCategory"
              label="Complaint Category"
              options={complaintCategories}
              rules={{ required: 'Please select a complaint category' }}
              error={errors.complaintCategory}
              onChange={handleCategoryChange}
            />
            
            {suboptionsVisible && (
              <SelectField
                control={control}
                name="subCategory"
                label="Sub Category"
                options={subCategoryOptions[selectedCategory] || []}
                rules={{ required: 'Please select a sub-category' }}
                error={errors.subCategory}
              />
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Complaint Description
            </label>
            <textarea
              {...control.register('complaintDescription', {
                required: 'Please provide a description of your complaint',
                validate: value => value.trim() !== '' || 'Description cannot be empty spaces'
              })}
              className={`w-full h-32 px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 ${
                errors.complaintDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.complaintDescription && (
              <p className="text-sm text-red-500">{errors.complaintDescription.message}</p>
            )}
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >{isLoading ? <Loader2 className='animate-spin'/> : ('Submit Complaint')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;