// utils/toast.ts
import React from 'react';
import ReactDOM from 'react-dom';

// Toast component (reusable)
const Toast = ({ variant, title, description }: { variant: string; title: string; description: string }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg text-white animate-slideIn animate-fadeOut-with-delay ${
        variant === 'success'
          ? 'bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70]'
          : variant === 'error'
          ? 'bg-red-500'
          : variant === 'warning'
          ? 'bg-yellow-500'
          : 'bg-blue-500'
      }`}
    >
      <h5 className="font-medium">{title}</h5>
      <p className="text-sm">{description}</p>
    </div>
  );
};
// Toast utility function
export const toast = (variant: 'success' | 'error' | 'warning' | 'info', title: string, description: string) => {
  // Create a container for the toast
  const toastContainer = document.createElement('div');
  document.body.appendChild(toastContainer);

  // Render the toast component
  ReactDOM.render(<Toast variant={variant} title={title} description={description} />, toastContainer);

  // Automatically remove the toast after 3 seconds
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(toastContainer);
    document.body.removeChild(toastContainer);
  }, 3000);
};