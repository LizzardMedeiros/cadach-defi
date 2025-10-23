import { useEffect } from "react";

export default function Modal({ isOpen, onClose, onOpen, children }) {
  // Run onOpen when modal opens
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      const y = window.scrollY || window.pageYOffset || 0;
      body.dataset.scrollY = String(y);

      // trava o fundo de forma robusta
      body.style.position = "fixed";
      body.style.top = `-${y}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      // bloqueia overflow no root e evita scroll chaining
      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "contain";

      onOpen?.();
    } else {
      // restaura
      const saved = parseInt(body.dataset.scrollY || "0", 10);

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.removeAttribute("data-scroll-y");

      const html = document.documentElement;
      html.style.overflow = "";
      html.style.overscrollBehavior = "";

      // volta pro ponto onde o usuário estava
      window.scrollTo(0, saved);
    }

    return () => {
      // limpeza caso o componente desmonte com o modal aberto
      const saved = parseInt(body?.dataset?.scrollY || "0", 10);

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body?.removeAttribute?.("data-scroll-y");

      const html = document.documentElement;
      html.style.overflow = "";
      html.style.overscrollBehavior = "";

      if (isOpen) window.scrollTo(0, saved);
    };
  }, [isOpen, onOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4
      max-w-screen  scroll-auto" 
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