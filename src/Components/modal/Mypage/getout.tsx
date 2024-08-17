import React, { useState } from 'react'
import './Mypagemodal.css'

const Getout: React.FC = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleGetoutClick = () => {
    setShowConfirmModal(true)
  }

  const handleConfirm = () => {
    // 여기에 실제 탈퇴 로직을 구현합니다.
    console.log('사용자가 탈퇴를 확인했습니다.')
    setShowConfirmModal(false)
  }

  const handleCancel = () => {
    setShowConfirmModal(false)
  }

  return (
    <div className="Getout-Container">
      <div className="Getout-MainTitle">서비스 탈퇴</div>
      <div className="Getout-Button" onClick={handleGetoutClick}>
        탈퇴하기
      </div>

      {showConfirmModal && (
        <div className="Confirm-Modal">
          <div className="Confirm-Modal-Content">
            <p>정말로 탈퇴하시겠습니까?</p>
            <div className="Confirm-Modal-Buttons">
              <button onClick={handleConfirm}>확인</button>
              <button onClick={handleCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Getout
