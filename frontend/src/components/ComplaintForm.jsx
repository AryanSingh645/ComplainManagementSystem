import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormField from './FormField';
import SelectField from './SelectField';

const ComplaintForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suboptionsVisible, setSuboptionsVisible] = useState(false);
  
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
    { value: 'Clubhouse', label: 'Clubhouse' },
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

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    reset();
    setSelectedCategory('');
    setSuboptionsVisible(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-200">
      <div className="p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Resident Complaint Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="name"
              label="Name"
              rules={{ required: 'Name is required' }}
              error={errors.name}
            />
            
            <FormField
              control={control}
              name="phoneNumber"
              label="Phone Number"
              rules={{ 
                required: 'Phone number is required',
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
                required: 'Email is required',
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
              rules={{ required: 'Block number is required' }}
              error={errors.blockNumber}
            />
            
            <FormField
              control={control}
              name="flatNumber"
              label="Flat Number"
              rules={{ required: 'Flat number is required' }}
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
                required: 'Please provide a description of your complaint'
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
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;