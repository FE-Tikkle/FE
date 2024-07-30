import React, { useState } from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Login.css'

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

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [allChecked, setAllChecked] = useState(false)
  const [terms, setTerms] = useState({
    termsOfService: false,
    privacyPolicy: false,
    promotions: false,
  })
  const [extraDepartment, setExtraDepartment] = useState('') // 추가된 학과 상태

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setAllChecked(checked)
    setTerms({
      termsOfService: checked,
      privacyPolicy: checked,
      promotions: checked,
    })
  }

  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setTerms(prevTerms => ({
      ...prevTerms,
      [name]: checked,
    }))
  }

  const handleExtraDepartmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExtraDepartment(event.target.value)
  }

  const handleFormSubmit = () => {
    onSubmit()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="login-modal-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <div className="Login-info-left">
            <div className="Login-maintext">
              <div>티끌</div>
              <div>당신의 커리어를 응원합니다.</div>
              <div>오늘도 행복한 하루되세요.</div>
            </div>
            <div className="Login-img">
              <img
                className="Login-Image"
                alt="Login-Img1"
                src="img\Login_img.png"
              />
            </div>
          </div>
        </motion.div>
        <motion.div variants={item}>
          <div className="Login-info-right">
            <div className="Login-Information">
              <div className="Login-input">
                <div className="Login-form-group">
                  <label className="Login-form-label">사용자 이름</label>
                  <input type="text" id="name" className="Login-form-input" />
                </div>
                <div className="Login-form-group">
                  <label className="form-label">학교</label>
                  <input type="text" id="school" className="Login-form-input" />
                </div>
                <div className="Login-form-group">
                  <label className="form-label">학과</label>
                  <input type="text" id="depart" className="Login-form-input" />
                </div>
                <div className="Login-form-group">
                  <label className="form-label">추가 관심 학과</label>
                  <input
                    type="text"
                    id="extra-department"
                    className="Login-form-input"
                    value={extraDepartment}
                    onChange={handleExtraDepartmentChange}
                  />
                </div>
                <div className="Login-terms">
                  <div className="terms-form">
                    <div className="term-item">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={handleAllChange}
                        id="chk1"
                      />
                      <label htmlFor="chk1"></label>
                      <label htmlFor="chk1">선택 포함 전체 약관 동의</label>
                    </div>
                    <div className="term-item">
                      <input
                        type="checkbox"
                        name="termsOfService"
                        checked={terms.termsOfService}
                        onChange={handleTermChange}
                        id="chk2"
                      />
                      <label htmlFor="chk2"></label>
                      <label htmlFor="chk2">이용약관 동의 (필수)</label>
                    </div>
                    <div className="term-item">
                      <input
                        type="checkbox"
                        name="privacyPolicy"
                        checked={terms.privacyPolicy}
                        onChange={handleTermChange}
                        id="chk3"
                      />
                      <label htmlFor="chk3"></label>
                      <label htmlFor="chk3">
                        개인정보 수집 및 이용동의 (필수)
                      </label>
                    </div>
                    <div className="term-item">
                      <input
                        type="checkbox"
                        name="promotions"
                        checked={terms.promotions}
                        onChange={handleTermChange}
                        id="chk4"
                      />
                      <label htmlFor="chk4"></label>
                      <label htmlFor="chk4">
                        프로모션 등 혜택/정보 수신 동의 (선택)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="submit-btn"
                onClick={handleFormSubmit} // 제출 이벤트 핸들러 연결
              >
                다음
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Modal>
  )
}

export default InfoModal
