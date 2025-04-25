import { Controller } from 'react-hook-form';

const FormField = ({ control, name, label, rules, error, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="space-y-2">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
          <input 
            id={name}
            {...field}
            {...props}
            className={`w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {error && (
            <span className="text-sm text-red-500">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default FormField;