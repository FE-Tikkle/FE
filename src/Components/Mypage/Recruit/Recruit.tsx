import React, { useState } from 'react'
import './Recruit.css'

interface FormData {
  school: string
  campus: string
  major: string
  year: string
  relatedSubject: string
  bookOrLectureNote: string
}

const Recruit: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    school: '',
    campus: '',
    major: '',
    year: '',
    relatedSubject: '',
    bookOrLectureNote: '',
  })
  const [field, setField] = useState('')
  const [subField, setSubField] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // 여기에 폼 제출 로직 추가
  }

  return (
    <div className="Recruit-All">
      <div className="Recruit-title">관심있는 취업분야를 선택해요</div>
      <div className="Recruit-Container">
        <form onSubmit={handleSubmit}>
          {[0, 1, 2].map(index => (
            <div className="Recruit-Conatiner2" key={index}>
              <div className="Recruit-text-Container">
                <label htmlFor={`school-${index}`}>분야</label>
                <select 
                  id="field"
                  className="field-select"
                  value={field}
                  onChange={e => setField(e.target.value)}
                >
                  <option value="" disabled>
                    관심 분야를 선택하세요
                  </option>
                  {/* {fields.map((field, index) => (
                      <option key={index} value={field}>
                        {field}
                      </option>
                  ))} */}
                </select>
              </div>
              <div className="Recruit-text-Container">
                <label htmlFor={`campus-${index}`}>세부 분야</label>
                <select 
                id="sub-field"
                className="field-select"
                value={subField}
                onChange={e => setSubField(e.target.value)}
                >
                  <option value="" disabled>
                    세부 분야를 선택하세요
                  </option>
                  {/* {fields.map((field, index) => (
                      <option key={index} value={field}>
                        {field}
                      </option>
                  ))} */}
                </select>
              </div>
            </div>
          ))}
          <p className="Myschool-text">
            관심있는 학과를 선택해 공지사항을 확인해보세요!
          </p>
          <div className="buttons-1">
            <button className="button-1" type="submit">
              저장
            </button>
            <button className="button-1" type="button">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recruit;