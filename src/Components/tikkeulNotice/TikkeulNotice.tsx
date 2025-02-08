import React from 'react';
import './TikkeulNotice.css';
import TikkeulNoticeItem from './TikkeulNoticeItem';

interface TikkeulNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

const TikkeulNotice: React.FC<TikkeulNoticeProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='tikkeul-notice-container'>
    <div className="tikkeul-notice">
      <div className="tikkeul-notice-header">
        <span className="tikkeul-notice-header-title">공지</span>
        <img
          className="tikkeul-notice-header-close"
          src='/img/tikkeulNoticeClose.svg'
          alt="close"
          onClick={onClose}
        />
      </div>
      <div className="tikkeul-notice-content-box">
        <div className="tikkeul-notice-contents-list">
            <TikkeulNoticeItem title="공지사항" date="2025.02.08" />
            <TikkeulNoticeItem title="공지사항" date="2025.02.07" />
            <TikkeulNoticeItem title="공지사항" date="2025.02.07" />
            <TikkeulNoticeItem title="공지사항" date="2025.02.07" />
        </div>
      </div>
      <div className="tikkeul-notice-footer">
        <div className="tikkeul-notice-footer-button">
          <div className='tikkeul-notice-footer-button-text'>전체보기</div>
          {/* <img src={arrowRight} alt="arrowRight" /> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TikkeulNotice;
