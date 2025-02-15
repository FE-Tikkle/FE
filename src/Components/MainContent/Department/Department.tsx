import React, { useState, useEffect } from 'react'
import './Department.css'

interface DepartmentProps {
  departments: string[]
  onDepartmentSelect: (department: string) => void // Prop to notify parent about the selected department
}

const Department: React.FC<DepartmentProps> = ({
  departments,
  onDepartmentSelect,
}) => {
  // 초기값을 로컬스토리지에서 가져오기
  const [selectedDepartment, setSelectedDepartment] = useState<string>(() => {
    const stored = localStorage.getItem('selectedDepartment')
    return stored || '전체공지'
  })

  // 컴포넌트 마운트 시 저장된 department 적용
  useEffect(() => {
    onDepartmentSelect(selectedDepartment)
  }, [])

  const handleClick = (department: string) => {
    setSelectedDepartment(department)
    onDepartmentSelect(department)
    localStorage.setItem('selectedDepartment', department)
  }

  return (
    <div className="department-container">
      {departments.map(department => (
        <div
          key={department}
          className={`department-selector ${
            selectedDepartment === department ? 'selected' : ''
          }`}
          onClick={() => handleClick(department)}
        >
          {department}
        </div>
      ))}
    </div>
  )
}

export default Department
