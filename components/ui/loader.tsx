import React from 'react';
import { Soup } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black/50 fixed top-0 left-0 z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-bounce">
          <Soup className="w-32 h-32 text-white" />
        </div>
        <p className="mt-4 text-white text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;