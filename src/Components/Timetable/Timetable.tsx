import React from 'react';
import './Timetable.css';

interface ClassItem {
  name: string;
  day: number;       // 0=Sun ... 6=Sat
  startHour: number;
  endHour: number;   // exclusive
  color?: string;
}

const classes: ClassItem[] = [
  { name: '디자인의 원리', day: 1, startHour: 9,  endHour: 11, color: '#55A8FF' },
  { name: '아이덴티티디자인 - 심화', day: 1, startHour: 13, endHour: 15, color: '#2E7CFD' },
  { name: '광고디자인', day: 3, startHour: 10, endHour: 12, color: '#FFF2BF' },
  { name: '프로그래밍과코딩언어', day: 3, startHour: 13, endHour: 16, color: '#0D5AC9' },
  { name: '신나는프랑스문화와언어', day: 5, startHour: 9,  endHour: 11, color: '#FFF2BF' },
  { name: '프로세스세미나', day: 5, startHour: 13, endHour: 15, color: '#62B2FF' },
];

const Timetable: React.FC = () => {
  const days = ['S','M','T','W','T','F','S'];
  const hours = Array.from({ length: 13 }, (_, i) => 8 + i); // 8~20
  const toRow = (h: number) => (h - 8) + 2; // 1행=요일헤더, 2행부터 8시

  return (
    <div className="Calendar-Container">
      <h1 className="tt-term">2025. 4-1</h1>

      <div className="timetable-grid">
        {/* 좌상단 빈칸 */}
        <div className="empty-cell" />

        {/* 요일 헤더 */}
        {days.map((d, i) => (
          <div key={i} className="day-header">{d}</div>
        ))}

        {/* 왼쪽 시간 라벨만 */}
        {hours.map(h => (
          <React.Fragment key={h}>
            <div className="hour-label">{h}:00</div>
            {days.map((_, j) => (
              <div key={`${h}-${j}`} className="cell" />
            ))}
          </React.Fragment>
        ))}

        {/* 수업 카드 */}
        {classes.map((c, idx) => (
          <div
            key={idx}
            className="class-block"
            style={{
              gridColumn: c.day + 2,        // 1열: 시간, 2~8: 요일
              gridRowStart: toRow(c.startHour),
              gridRowEnd: toRow(c.endHour),
              backgroundColor: c.color,
            }}
            title={`${c.name} ${c.startHour}:00~${c.endHour}:00`}
          >
            <span className="class-name">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
