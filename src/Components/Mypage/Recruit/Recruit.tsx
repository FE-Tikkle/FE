import React, { useState, useEffect } from 'react'
import './Recruit.css'
import { getSaraminTags } from '../../../api'

interface FormData {
  school: string
  campus: string
  major: string
  year: string
  relatedSubject: string
  bookOrLectureNote: string
}

interface FieldSelection {
  field: string
  subField: string
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
  const [fieldSelections, setFieldSelections] = useState<FieldSelection[]>([
    { field: '', subField: '' },
    { field: '', subField: '' },
    { field: '', subField: '' },
  ])
  const [tags, setTags] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getSaraminTags()
        setTags(tagsData)
        console.log('Saramin Tags:', tagsData)
      } catch (error) {
        console.error('Error fetching Saramin tags:', error)
      }
    }

    fetchTags()
  }, [])

  const handleFieldChange = (index: number, value: string) => {
    const newSelections = [...fieldSelections]
    newSelections[index] = { field: value, subField: '' }
    setFieldSelections(newSelections)
  }

  const handleSubFieldChange = (index: number, value: string) => {
    const newSelections = [...fieldSelections]
    newSelections[index] = { ...newSelections[index], subField: value }
    setFieldSelections(newSelections)
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
                <label htmlFor={`field-${index}`}>분야</label>
                <select 
                  id={`field-${index}`}
                  className="field-select"
                  value={fieldSelections[index].field}
                  onChange={e => handleFieldChange(index, e.target.value)}
                >
                  <option value="" disabled>
                    관심 분야를 선택하세요
                  </option>
                  {Object.keys(tags).map((tagKey, idx) => (
                    <option key={idx} value={tagKey}>
                      {tagKey}
                    </option>
                  ))}
                </select>
              </div>
              <div className="Recruit-text-Container">
                <label htmlFor={`sub-field-${index}`}>세부 분야</label>
                <select 
                  id={`sub-field-${index}`}
                  className="field-select"
                  value={fieldSelections[index].subField}
                  onChange={e => handleSubFieldChange(index, e.target.value)}
                >
                  <option value="" disabled>
                    세부 분야를 선택하세요
                  </option>
                  {fieldSelections[index].field && tags[fieldSelections[index].field] && 
                    tags[fieldSelections[index].field].map((subField, idx) => (
                      <option key={idx} value={subField}>
                        {subField}
                      </option>
                    ))
                  }
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