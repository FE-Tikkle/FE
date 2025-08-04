// Timetable.tsx
import React from 'react';
import './Timetable.css';
//더미아이템들
interface ClassItem {
  name: string;
  day: number;     
  startHour: number; 
  endHour: number;
  color?: string;
}

const dummyClasses: ClassItem[] = [
  { name: '디자인의 원리', day: 1, startHour: 9, endHour: 11, color: '#4A90E2' },
  { name: '아이덴티티디자인 - 심화', day: 1, startHour: 13, endHour: 15, color: '#1E88E5' },
  { name: '광고디자인', day: 3, startHour: 10, endHour: 12, color: '#FFF9C4' },
  { name: '프로그래밍과코딩언어', day: 3, startHour: 13, endHour: 16, color: '#1565C0' },
  { name: '신나는프랑스문화와언어', day: 5, startHour: 9, endHour: 11, color: '#FFF9C4' },
  { name: '프로세스세미나', day: 5, startHour: 13, endHour: 15, color: '#4FC3F7' },
];

const Timetable: React.FC = () => {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 ~ 20
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (

    <div className="timetable-container">
        
    <div className="timetable-grid">
      {/* 요일 헤더 */}
      <div className="empty-cell" />
      {days.map((day, idx) => (
        <div key={idx} className="day-header">{day}</div>
      ))}

      {/* 시간 라벨 */}
      {hours.map((hour, i) => (
        <React.Fragment key={i}>
          <div className="hour-label">{hour}:00</div>
          {days.map((_, j) => (
            <div key={`${i}-${j}`} className="cell" />
          ))}
        </React.Fragment>
      ))}

      {/* 수업 블록 */}
      {dummyClasses.map((cls, idx) => (
        <div
          key={idx}
          className="class-block"
          style={{
            gridColumn: cls.day + 2, 
            gridRowStart: cls.startHour - 7, 
            gridRowEnd: cls.endHour - 7,
            backgroundColor: cls.color || '#90CAF9',
          }}
        >
          {cls.name}
        </div>
      ))}
    </div>

    </div>
  )
}
export default Timetable
