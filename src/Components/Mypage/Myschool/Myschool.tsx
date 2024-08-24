import React, { useState, useEffect } from 'react'
import './Myschool.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  postUserData,
  getNoticeDepartment,
  getNoticeSite,
  getNoticeDepartment2,
} from '../../../api'

interface FormData {
  school: string
  campus: string
  major: string
  year: string
  relatedSubject: string
  bookOrLectureNote: string
}

const Myschool: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    school: '',
    campus: '',
    major: '',
    year: '',
    relatedSubject: '',
    bookOrLectureNote: '',
  })

  const [school, setSchool] = useState('')
  const [department, setDepartment] = useState('')
  const [schools, setSchools] = useState<string[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [departments2, setDepartments2] = useState<string[]>([])
  const [subscribeDepartments, setSubscribeDepartments] = useState<string[]>([
    '',
    '',
    '',
    '',
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubscribeDepartmentChange = (index: number, value: string) => {
    const newSubscribeDepartments = [...subscribeDepartments]
    newSubscribeDepartments[index] = value
    setSubscribeDepartments(newSubscribeDepartments)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // 여기에 폼 제출 로직 추가
  }

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

  return (
    <div className="Myschool-All">
      <div className="Myschool-title">나의 학력사항을 입력해요</div>
      <div className="Myschool-Container">
        <form onSubmit={handleSubmit}>
          <div className="Myschool-Conatiner2">
            <div className="Myschool-text-Container">
              <label htmlFor="school">학교</label>
              <select
                value={school}
                onChange={e => {
                  setSchool(e.target.value)
                  setDepartment('') // 학교 변경 시 학과 초기화
                }}
              >
                <option value="" disabled>
                  학교를 선택해주세요
                </option>
                {schools.map((schoolName, index) => (
                  <option key={index} value={schoolName}>
                    {schoolName}
                  </option>
                ))}
              </select>
            </div>
            <div className="Myschool-text-Container">
              <label htmlFor="campus">학과</label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
              >
                <option value="" disabled>
                  학과를 선택해주세요
                </option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="Myschool-Conatiner2">
            <div className="Myschool-text-Container">
              <label htmlFor="major">관심 학과 1</label>
                <select
                    id={`extra-department-${1}`}
                    className="Login-form-input1"
                    value={subscribeDepartments[0]}
                    onChange={e =>
                    handleSubscribeDepartmentChange(
                      0,
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
            </div>
            <div className="Myschool-text-Container">
              <label htmlFor="year">관심 학과 2</label>
              <select
                    id={`extra-department-${2}`}
                    className="Login-form-input1"
                    value={subscribeDepartments[1]}
                    onChange={e =>
                    handleSubscribeDepartmentChange(
                      1,
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
            </div>
          </div>

          <div className="Myschool-Conatiner2">
            <div className="Myschool-text-Container">
              <label htmlFor="major">관심 학과 3</label>
              <select
                    id={`extra-department-${3}`}
                    className="Login-form-input1"
                    value={subscribeDepartments[2]}
                    onChange={e =>
                    handleSubscribeDepartmentChange(
                      2,
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
            </div>
            <div className="Myschool-text-Container">
              <label htmlFor="year">관심 학과 4</label>
              <select
                    id={`extra-department-${4}`}
                    className="Login-form-input1"
                    value={subscribeDepartments[3]}
                    onChange={e =>
                    handleSubscribeDepartmentChange(
                      3,
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
            </div>
          </div>

          <p className="Myschool-text">
            관심있는 학과를 선택해 공지사항을 확인해보세요!
          </p>
          <div className="buttons">
            <button className="button" type="submit">
              저장
            </button>
            <button className="button" type="button">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Myschool
