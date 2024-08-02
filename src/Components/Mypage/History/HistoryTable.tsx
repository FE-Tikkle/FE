import React, { useState } from 'react'
import './History.css'

interface Item {
  분야: string
  제목: string
  날짜: string
}

const HistoryTable: React.FC = () => {
  const initialData: Item[] = [
    {
      분야: '학사',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
    {
      분야: '특강',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
    {
      분야: '모집/채용',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
    {
      분야: '대외활동',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
    {
      분야: '학사',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
    {
      분야: '특강',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
    {
      분야: '모집/채용',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
    {
      분야: '대외활동',
      제목: '[미래자동차사업단] 미래자동차 현장직 직무 특강: 8.5(월) ~ 8.9(금), 하이테크 105호',
      날짜: '2024.07.01',
    },
  ]

  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<Item[]>(initialData)
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date('2024-03-01')
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date('2024-07-01')
  )

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIdx, startIdx + itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
  }

  const handleCheckboxChange = (index: number) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = new Set(prevSelectedItems)
      if (newSelectedItems.has(index)) {
        newSelectedItems.delete(index)
      } else {
        newSelectedItems.add(index)
      }
      return newSelectedItems
    })
  }

  const handleDelete = () => {
    const newData = data.filter((_, index) => !selectedItems.has(index))
    setData(newData)
    setSelectedItems(new Set())
    setCurrentPage(1)
  }
  const handleDateChange =
    (isStart: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value)
      if (isStart) {
        setStartDate(isNaN(date.getTime()) ? undefined : date)
      } else {
        setEndDate(isNaN(date.getTime()) ? undefined : date)
      }
    }
  return (
    <div className="history-container">
      <div className="date-header">
        <div className="date-picker">
          <img src="img/calendar_2.svg" />
          <input
            type="date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={handleDateChange(true)}
            max={endDate ? endDate.toISOString().split('T')[0] : undefined}
            className="date-input"
          />
        </div>
        <img src="img/delete_2.svg" />
        <button className="delete-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
      <table className="history-table">
        <thead>
          <tr>
            <th></th>
            <th>분야</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={startIdx + index}>
              <td>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(startIdx + index)}
                    onChange={() => handleCheckboxChange(startIdx + index)}
                  />
                  <span className="custom-checkbox"></span>
                </label>
              </td>
              <td>{item.분야}</td>
              <td>{item.제목}</td>
              <td>{item.날짜}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination1">
        <button
          className="page-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <img src="/img/left.svg" alt="Previous" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={`page-number ${
              currentPage === index + 1 ? 'active' : ''
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button
          className="page-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <img src="/img/right.svg" alt="Next" />
        </button>
      </div>
    </div>
  )
}

export default HistoryTable
