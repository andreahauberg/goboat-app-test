import React from "react";

export default function SettingsPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p className="text-gray-700">This is the settings modal content.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-mediumBlue text-white rounded hover:bg-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
