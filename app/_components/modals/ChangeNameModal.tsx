import React, { useState } from 'react';``
import LoadingBar from '@/app/_components/LoadingBar';
import { buttonStyles } from '@/app/_globals/ButtonStyles';

export default function ChangeNameModal({ 
    isOpen, onClose, newName, onChange, onSave
}: { isOpen: boolean; onClose: () => void; newName: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onSave: (newName: string) => void }) {
  if (!isOpen) {
    return <LoadingBar />;
  }
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-white">Change Name</h2>
        <input
          type="text"
          value={newName}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            className={buttonStyles.secondary}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={buttonStyles.primary}
            onClick={() => onSave(newName)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}