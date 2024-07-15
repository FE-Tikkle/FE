import React from 'react'
import './activites.css'
const Activities: React.FC = () => {
  return (
    <div className="Activities-Container">
      <div className="Activities-Card">
        <div className="Activities-Card-title">
          KB-YMCA 대학생경제금융교육봉사단 폴라리스
        </div>
        <div className="Activities-Card-main">
          <div className="Activities-Card-img"></div>
          <div className="Activities-Card-main-right">
            <div className="Activities-Card-main-title">
              [KB국민은행] 한국YMCA전국연맹
            </div>
            <div className="Activities-Card-main-text">
              <div className="Activities-Card-main-dday">
                <div className="Activities-Card-main-ddaybox">D-3</div>
                <div className="Activities-Card-main-ddaybox2">
                  # 비영리단체
                </div>
                <div className="Activities-Card-main-ddaybox2"># 봉사단</div>
              </div>
              <div className="Activities-Card-main-info">
                <div className="Activities-Card-main-info1">참여대상</div>
                <div className="Activities-Card-main-info2">대학생</div>
                <div className="Activities-Card-main-info1">관심분야</div>
                <div className="Activities-Card-main-info2">교육경제/금융</div>
                <div className="Activities-Card-main-info1">마감일</div>
                <div className="Activities-Card-main-info2">2024.07.26</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activities
