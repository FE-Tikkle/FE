import './TikkeulNotice.css';

const handleClick = (url: string) => {
    if(url !== "") {
        window.open(url, '_blank');
    }
}

const TikkeulNoticeItem = (data: {title: string, date: string,url:string}) => {
    const date = new Date(data.date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    return(
        <div className="tikkeul-notice-item" onClick={() => handleClick(data.url)}> 
            <div className="tikkeul-notice-item-title">
                <div className='tikkeul-notice-item-title-text'>{data.title}</div>
                {(() => {
                    const today = new Date();
                    const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                    return formattedDate === todayFormatted;
                })() && (
                    <div className='tikkeul-notice-item-new'>
                        N
                    </div>
                )}
            </div>
            <div className='tikkeul-notice-item-date'>
                <span className='tikkeul-notice-item-date-text'>{formattedDate}</span>
            </div>
        </div>
    )
}

export default TikkeulNoticeItem;