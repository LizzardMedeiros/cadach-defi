import { useEffect } from "react";

export default function Modal({ isOpen, onClose, onOpen, children }) {
  // Run onOpen when modal opens
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4
      max-w-screen h-[100dvh]" 
    >
      <div className="      
        bg-white rounded-xl shadow-lg relative 
        max-w-[min(90vw,520px)] w-full 
        max-h-[85dvh] flex flex-col p-1
        will-change-[opacity]" 
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ×
        </button>
        
        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}