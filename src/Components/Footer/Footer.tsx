import React from 'react'
import './Footer.css'
const Footer: React.FC = () => {
  return (
    <div>
      <div className="Footer-main">
        <div className="Footer-left">
          <div className="Footer-Title">티끌</div>
          <div className="Footer-information-1">
            <div className="Footer-Contact">Contact : tikkeul@gmail.com</div>
            <div className="Footer-Adress">
              Adress : 인천광역시 미추홀구 인하로 100
            </div>
            <div className="Footer-Copyright">
              Copyright (c) tikkeul. All rights reserved.
            </div>
          </div>
        </div>
        <div className="Footer-right">
          <div className="Footer-information-2">
            <div className="Footer-gudie">
              티끌
              <div className="Footer-ui">
                <div className="Footer-guide">
                  <div className="Footer-point" />
                  티끌 소개
                </div>
                <div className="Footer-guide">
                  <div className="Footer-point" />
                  공지사항
                </div>
              </div>
            </div>
            <div className="Footer-gudie">
              고객문의
              <div className="Footer-ui">
                <div className="Footer-guide">
                  <div className="Footer-point" />
                  광고 및 제휴 문의
                </div>
                <div className="Footer-guide">
                  <div className="Footer-point" />
                  고객문의
                </div>
                <div className="Footer-guide">
                  <div className="Footer-point" />
                  FAQ
                </div>
              </div>
            </div>
            <div className="Footer-gudie">
              이용안내
              <div className="Footer-ui">
                <div className="Footer-guide">
                  <div className="Footer-point" />
                  이용약관
                </div>
                <div className="Footer-guide">
                  <div className="Footer-point" />
                  개인정보처리방침
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
