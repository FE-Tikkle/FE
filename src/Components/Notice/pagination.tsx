import React from 'react'
import './notice.css'
interface PaginationProps {
  noticesPerPage: number
  totalNotices: number
  paginate: (pageNumber: number) => void
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({
  noticesPerPage,
  totalNotices,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(totalNotices / noticesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      <img
        src="img/left.svg"
        alt="Previous"
        onClick={() =>
          paginate(currentPage > 1 ? currentPage - 1 : currentPage)
        }
        className={currentPage === 1 ? 'disabled' : ''}
      />
      {pageNumbers.map(number => (
        <span
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? 'active' : ''}
        >
          {number}
        </span>
      ))}
      <img
        src="img/right.svg"
        alt="Next"
        onClick={() =>
          paginate(
            currentPage < pageNumbers.length ? currentPage + 1 : currentPage
          )
        }
        className={currentPage === pageNumbers.length ? 'disabled' : ''}
      />
    </div>
  )
}

export default Pagination
