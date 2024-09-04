import React, { useState, useEffect } from 'react'
import './Myschool.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  getUserData,
  updateUserUniversity,
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

interface MySchoolProps {
  onClose: () => void;
}

const Myschool: React.FC<MySchoolProps> = ({ onClose })=> {
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
  const [subscribeDepartments, setSubscribeDepartments] = useState<string[]>(['', '', '', ''])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setSchool(userData.university);
        setDepartment(userData.department);
        setSubscribeDepartments(userData.subscribe_notices_without_filter.concat(Array(4 - userData.subscribe_notices_without_filter.length).fill('')));
        console.log('구독학과:',userData.subscribe_notices_without_filter);
      } catch (error) {
        console.error('사용자 데이터를 불러오는 데 실패했습니다:', error);
        toast.error('사용자 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchUserData();
  }, []);

  const handleSubscribeDepartmentChange = (index: number, value: string) => {
    const newSubscribeDepartments = [...subscribeDepartments]
    newSubscribeDepartments[index] = value
    setSubscribeDepartments(newSubscribeDepartments)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updateData = {
        university: school,
        department: department,
        subscribe_notices: subscribeDepartments.filter(dept => dept !== '')
      };
      console.log(updateData);
      await updateUserUniversity(updateData);
      toast.success('학교 정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('학교 정보 업데이트 실패:', error);
      toast.error('학교 정보 업데이트에 실패했습니다.');
    }
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
        console.log('fail');
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
                  setSubscribeDepartments(['', '', '', '']) // 관심 학과 초기화
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
              <label htmlFor="major">관심 사이트 1</label>
                <select
                    id={`extra-department-${1}`}
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
              <label htmlFor="year">관심 사이트 2</label>
              <select
                    id={`extra-department-${2}`}
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
              <label htmlFor="major">관심 사이트 3</label>
              <select
                    id={`extra-department-${3}`}
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
              <label htmlFor="year">관심 사이트 4</label>
              <select
                    id={`extra-department-${4}`}
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
            <button className="button" type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Myschool
