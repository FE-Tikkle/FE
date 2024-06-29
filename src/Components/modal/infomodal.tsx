import React from 'react'
import Modal from './modal'
import { motion } from 'framer-motion'
import './modal.css'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void // 새로운 정보 입력을 완료할 때 호출될 함수
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // 입력 값 변경 시 호출될 함수
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="info-modal-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={item}>새로운 정보 입력</motion.h2>
        <motion.input
          type="text"
          name="infoInput"
          placeholder="정보를 입력하세요"
          onChange={onChange}
          variants={item}
        />
        <motion.button variants={item} onClick={onSubmit}>
          정보 입력 완료
        </motion.button>
      </motion.div>
    </Modal>
  )
}

export default InfoModal
