// components/CustomDialog.js
import React from 'react';

const CustomDialog = ({ title = 'Alert', message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center space-y-4">
        <h2 className="text-lg font-bold text-[#2d1d0f]">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomDialog;
