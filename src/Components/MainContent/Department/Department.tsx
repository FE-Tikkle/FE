import React, { useState } from 'react'
import './Department.css'

const departments: string[] = ['정보통신공학과', '컴퓨터공학과', '전자공학과']

const Department: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  )

  const handleClick = (department: string) => {
    setSelectedDepartment(department)
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
