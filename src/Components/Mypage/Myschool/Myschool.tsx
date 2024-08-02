import React, { useState } from 'react'
import './Myschool.css'

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
    <div className="Myschool-All">
      <div className="Myschool-title">나의 학력사항을 입력해요</div>
      <div className="Myschool-Container">
        <form onSubmit={handleSubmit}>
          <div className="Myschool-Conatiner2">
            <div className="Myschool-text-Container">
              <label htmlFor="school">학교</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
              />
            </div>
            <div className="Myschool-text-Container">
              <label htmlFor="campus">캠퍼스</label>
              <input
                type="text"
                id="campus"
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="Myschool-Conatiner2">
            <div className="Myschool-text-Container">
              <label htmlFor="major">전공</label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
              />
            </div>
            <div className="Myschool-text-Container">
              <label htmlFor="year">학년</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="Myschool-Conatiner2">
            <div className="Myschool-text-Container">
              <label htmlFor="relatedSubject">관심 학과</label>
              <input
                type="text"
                id="relatedSubject"
                name="relatedSubject"
                value={formData.relatedSubject}
                onChange={handleInputChange}
              />
            </div>
            <div className="Myschool-text-Container">
              <label htmlFor="bookOrLectureNote">복/부진공</label>
              <input
                type="text"
                id="bookOrLectureNote"
                name="bookOrLectureNote"
                value={formData.bookOrLectureNote}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <p className="Myschool-text">
            관심있는 학과를 선택해 공자사항을 확인해보세요!
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
