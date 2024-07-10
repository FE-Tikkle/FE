import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './modal.css' // Import CSS file for styling

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  customCloseButton?: React.ReactNode // Optional custom close button
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  customCloseButton,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-container"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              {children}
              {customCloseButton ? (
                customCloseButton
              ) : (
                <motion.button
                  className="close-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                >
                  닫기
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
