import React, { useState } from 'react'
import './job.css'

const jobs: string[] = [
  'IT개발 / 데이터',
  '데이터 엔지니어',
  '백엔드 / 서버개발',
  '데이터 사이언티스트',
]

const job: React.FC = () => {
  const [selectedjob, setSelectedjob] = useState<string | null>(null)

  const handleClick = (job: string) => {
    setSelectedjob(job)
  }

  return (
    <div className="job-container">
      {jobs.map(job => (
        <div
          key={job}
          className={`job-selector ${selectedjob === job ? 'selected' : ''}`}
          onClick={() => handleClick(job)}
        >
          {job}
        </div>
      ))}
    </div>
  )
}

export default job
