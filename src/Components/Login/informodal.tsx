import React, { useState, useEffect } from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Login.css'
import { postUserData, getNoticeDepartment, getNoticeSite } from '../../api'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
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
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [department, setDepartment] = useState('')
  const [schools, setSchools] = useState<string[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [terms, setTerms] = useState({
    termsOfService: false,
    privacyPolicy: false,
    promotions: false,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const siteData = await getNoticeSite()
        const departmentData = await getNoticeDepartment()

        const schoolOptions = siteData.map(notice => notice.department)
        const departmentOptions = departmentData.map(
          notice => notice.department
        )

        setSchools(schoolOptions)
        setDepartments(departmentOptions)
      } catch (error) {
        console.error('Error fetching options:', error)
      }
    }

    fetchData()
  }, [])
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

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    postUserData(name, school, department)
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
              <div className="Login-maintext-3">티끌은</div>
              <div className="Login-maintext-1">
                <div>
                  <span>커리어 솔루션</span>을 제안합니다.
                </div>
              </div>
              <div className="Login-maintext-2">
                <div>티끌은 다양한 정보 시장속에서 </div> 더 넓고 개인 맞춤화된
                경험과 가치를 만들어갑니다.
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={item}>
          <div className="Login-info-right">
            <div className="Login-Information">
              <div className="Login-input">
                <div className="Login-form-group">
                  <label className="Login-form-label">사용자 이름</label>
                  <input
                    type="text"
                    id="name"
                    className="Login-form-input2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="Login-form-group">
                  <label className="form-label">학교</label>
                  <select
                    id="school"
                    className="Login-form-input"
                    value={school}
                    onChange={e => setSchool(e.target.value)}
                  >
                    <option value="" disabled selected></option>
                    {schools.map(school => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="Login-form-group">
                  <label className="form-label">학과</label>
                  <select
                    id="depart"
                    className="Login-form-input"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                  >
                    <option value="" disabled selected></option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="Login-form-group">
                  <label className="form-label">구독할 학과</label>
                  <div className="Login-form-group2">
                    <select
                      id="extra-department-1"
                      className="Login-form-input1"
                      onChange={onChange}
                    >
                      <option value="" disabled selected></option>
                      <option value="extra1">Extra Dept 1</option>
                      <option value="extra2">Extra Dept 2</option>
                    </select>
                    <select
                      id="extra-department-2"
                      className="Login-form-input1"
                      onChange={onChange}
                    >
                      <option value="" disabled selected></option>
                      <option value="extra3">Extra Dept 3</option>
                      <option value="extra4">Extra Dept 4</option>
                    </select>
                    <select
                      id="extra-department-3"
                      className="Login-form-input1"
                      onChange={onChange}
                    >
                      <option value="" disabled selected></option>
                      <option value="extra5">Extra Dept 5</option>
                      <option value="extra6">Extra Dept 6</option>
                    </select>
                  </div>
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
              <button className="submit-btn" onClick={handleFormSubmit}>
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
