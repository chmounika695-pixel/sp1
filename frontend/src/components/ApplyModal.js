import React, { useEffect } from "react";
import { X, Globe, MapPin } from "lucide-react"; // Using lucide-react which is already in package.json

const ApplyModal = ({ isOpen, onClose, scholarshipName, applyLink, onOfflineClick }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 transform transition-all scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Apply for Scholarship</h2>
          <p className="text-sm text-gray-500 line-clamp-2">
            Choose how you would like to apply for the <span className="font-semibold">{scholarshipName}</span>.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Apply Online */}
          <button
            onClick={() => window.open(applyLink, "_blank")}
            className="w-full group relative flex items-center p-4 border-2 border-blue-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">Apply Online</h3>
              <p className="text-sm text-gray-500">Redirects to the official portal</p>
            </div>
          </button>

          {/* Apply Offline */}
          <button
            onClick={onOfflineClick}
            className="w-full group relative flex items-center p-4 border-2 border-green-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700">Apply Offline</h3>
              <p className="text-sm text-gray-500">Find nearby help centers</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
