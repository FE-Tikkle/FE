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
          <div className="Recruit-Conatiner2">
            <div className="Recruit-text-Container">
              <label htmlFor="school">분야</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
              />
            </div>
            <div className="Recruit-text-Container">
              <label htmlFor="campus">분야</label>
              <input
                type="text"
                id="campus"
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="Recruit-Conatiner2">
            <div className="Recruit-text-Container">
              <label htmlFor="major">분야</label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
              />
            </div>
            <div className="Recruit-text-Container">
              <label htmlFor="year">세부분야</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="Recruit-Conatiner2">
            <div className="Recruit-text-Container">
              <label htmlFor="relatedSubject">분야</label>
              <input
                type="text"
                id="relatedSubject"
                name="relatedSubject"
                value={formData.relatedSubject}
                onChange={handleInputChange}
              />
            </div>
            <div className="Recruit-text-Container">
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

          <div className="buttons-1">
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

export default Recruit
