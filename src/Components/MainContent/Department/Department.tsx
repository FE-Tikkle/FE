import React, { useState } from 'react'
import './Department.css'

interface DepartmentProps {
  departments: string[]
  onDepartmentSelect: (department: string) => void // Prop to notify parent about the selected department
}

const Department: React.FC<DepartmentProps> = ({
  departments,
  onDepartmentSelect,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    localStorage.getItem('selectedDepartment') || '전체공지'
  )

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
