import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const Modal = ({ isOpen, onClose, children }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="overflow-auto fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000070] bg-opacity-50 z-40 ">
      <div className="absolute inset-0" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className={`!relative  overflow-auto  bg-white p-5 rounded-2xl shadow-lg `}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <div className="top-0 z-40">{children}</div>
      </motion.div>
    </div>,
    document.body
  );
};

export default Modal;
