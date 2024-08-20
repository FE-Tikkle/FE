import React, { useState, useEffect } from 'react'
import Modal from '../modal/modal'
import { motion } from 'framer-motion'
import './Login.css'
import {
  postUserData,
  getNoticeDepartment,
  getNoticeSite,
  getNoticeDepartment2,
} from '../../api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  const [departments2, setDepartments2] = useState<string[]>([])
  const [subscribeDepartments, setSubscribeDepartments] = useState<string[]>([
    '',
    '',
    '',
  ])
  const [allChecked, setAllChecked] = useState(false)
  const [terms, setTerms] = useState({
    termsOfService: false,
    privacyPolicy: false,
    promotions: false,
  })

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schoolOptions: string[] = await getNoticeSite()
        setSchools(schoolOptions)
      } catch (error) {
        console.error('Error fetching schools:', error)
        toast.error('학교 목록을 불러오는 데 실패했습니다.')
      }
    }

    fetchSchools()
  }, [])

  useEffect(() => {
    const fetchDepartments = async () => {
      if (school) {
        try {
          const departmentOptions: string[] = await getNoticeDepartment(school)
          setDepartments(departmentOptions)
        } catch (error) {
          console.error('Error fetching departments:', error)
          toast.error('학과 목록을 불러오는 데 실패했습니다.')
        }
      } else {
        setDepartments([])
      }
    }

    fetchDepartments()
  }, [school])
  useEffect(() => {
    const fetchDepartments2 = async () => {
      if (school) {
        try {
          const departmentOptions2: string[] = await getNoticeDepartment2(
            school
          )
          setDepartments2(departmentOptions2)
        } catch (error) {
          console.error('Error fetching departments:', error)
          toast.error('구독 가능한 학과 목록을 불러오는 데 실패했습니다.')
        }
      } else {
        setDepartments2([])
      }
    }

    fetchDepartments2()
  }, [school])
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

  const handleSubscribeDepartmentChange = (index: number, value: string) => {
    const newSubscribeDepartments = [...subscribeDepartments]
    newSubscribeDepartments[index] = value
    setSubscribeDepartments(newSubscribeDepartments)
  }

  const validateForm = () => {
    if (!name) {
      toast.error('사용자 이름을 입력해주세요.')
      return false
    }
    if (!school) {
      toast.error('학교를 선택해주세요.')
      return false
    }
    if (!department) {
      toast.error('학과를 선택해주세요.')
      return false
    }
    if (!terms.termsOfService) {
      toast.error('이용약관에 동의해주세요.')
      return false
    }
    if (!terms.privacyPolicy) {
      toast.error('개인정보 수집 및 이용에 동의해주세요.')
      return false
    }
    return true
  }

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const userData = {
      name: name,
      university: school,
      department: department,
      subscribe_notices: subscribeDepartments.filter(dept => dept !== ''),
      terms_of_service_agreement: terms.termsOfService,
      personal_information_collection_agreement: terms.privacyPolicy,
      promotion_and_information_receipt_agreement: terms.promotions,
    }

    try {
      await postUserData(userData)
      localStorage.setItem('is_new', 'false')
      toast.success('사용자 정보가 성공적으로 등록되었습니다.')
      onSubmit()
      onClose()
    } catch (error) {
      console.error('Error posting user data:', error)
      toast.error('사용자 정보 제출에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <>
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
                  <div>티끌은 다양한 정보 시장속에서 </div> 더 넓고 개인
                  맞춤화된 경험과 가치를 만들어갑니다.
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
                      <option value="" disabled>
                        학교를 선택하세요
                      </option>
                      {schools.map((schoolName, index) => (
                        <option key={index} value={schoolName}>
                          {schoolName}
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
                      <option value="" disabled>
                        학과를 선택하세요
                      </option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="Login-form-group">
                    <label className="form-label">구독할 학과</label>
                    <div className="Login-form-group2">
                      {[0, 1, 2].map(index => (
                        <select
                          key={index}
                          id={`extra-department-${index + 1}`}
                          className="Login-form-input1"
                          value={subscribeDepartments[index]}
                          onChange={e =>
                            handleSubscribeDepartmentChange(
                              index,
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled>
                            선택
                          </option>
                          {departments2.map((dept, deptIndex) => (
                            <option key={deptIndex} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      ))}
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
      <ToastContainer position="bottom-center" autoClose={3000} />
    </>
  )
}

export default InfoModal
