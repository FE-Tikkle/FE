export interface Activity {
  title: string
  organization: string
  ddays: string[]
  target: string
  interestArea: string
  deadline: string
}

export const activitiesData: Activity[] = [
  {
    title: 'KB-YMCA 대학생경제금융교육봉사단 폴라리스',
    organization: '[KB국민은행] 한국YMCA전국연맹',
    ddays: ['D-3'],
    target: '대학생',
    interestArea: '교육경제/금융',
    deadline: '2024.07.26',
  },
  {
    title: '다른 예제 활동명',
    organization: '[기관명] 협회명',
    ddays: ['D-10'],
    target: '대상',
    interestArea: '분야',
    deadline: '2025.12.31',
  },
  {
    title: '다른 예제 활동명',
    organization: '[기관명] 협회명',
    ddays: ['D-10'],
    target: '대상',
    interestArea: '분야',
    deadline: '2025.12.31',
  },
]
