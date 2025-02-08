import './TikkeulNotice.css';

const TikkeulNoticeItem = (data: {title: string, date: string}) => {
    return(
        <div className="tikkeul-notice-item">
            <div className="tikkeul-notice-item-title">
                <div className='tikkeul-notice-item-title-text'>{data.title}</div>
                {(() => {
                    const today = new Date().toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).replace(/\. /g, '.').replace(/\.$/, '');
                    return data.date === today;
                })() && (
                    <div className='tikkeul-notice-item-new'>
                        N
                    </div>
                )}
            </div>
            <div className='tikkeul-notice-item-date'>
                <span className='tikkeul-notice-item-date-text'>{data.date}</span>
            </div>
        </div>
    )
}

export default TikkeulNoticeItem;