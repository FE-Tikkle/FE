import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Notice } from '../../../api'

// 로컬 스토리지에서 값을 안전하게 불러오는 유틸 함수
const getLocalValue = (key: string, defaultValue: string | null = null): string | null => {
  try {
    const item = localStorage.getItem(key)
    if (item === "null" || !item) return defaultValue
    return item
  } catch (error) {
    console.error(`Error getting ${key} from localStorage`, error)
    return defaultValue
  }
}

interface NoticeState {
  notices: Notice[]
  lastFetched: number | null
  cacheTimeout: number // 캐시 유효 시간 (밀리초)
  activeTab: string
  searchTerm: string
  selectedDepartment: string | null
  setNotices: (notices: Notice[]) => void
  updateCache: (notices: Notice[], tab: string, search: string, department: string | null) => void
  shouldFetchNewData: (tab: string, search: string, department: string | null) => boolean
}

// 초기 로컬스토리지 값 읽어오기
const storedActiveTab = getLocalValue('activeTab', '')
const storedSelectedDepartment = getLocalValue('selectedDepartment', '전체공지')

const useNoticeStore = create<NoticeState>()(
  devtools(
    (set, get) => ({
      notices: [],
      lastFetched: null,
      cacheTimeout: 5 * 60 * 1000, // 5분
      activeTab: storedActiveTab || '',
      searchTerm: '',
      selectedDepartment: storedSelectedDepartment,
      
      setNotices: (notices) => set({ notices }),
      
      updateCache: (notices, tab, search, department) => {
        // 상태 업데이트와 함께 로컬스토리지에도 저장
        set({
          notices,
          lastFetched: Date.now(),
          activeTab: tab,
          searchTerm: search,
          selectedDepartment: department,
        })
        try {
          localStorage.setItem('activeTab', tab)
          localStorage.setItem('selectedDepartment', department === null ? "null" : department)
        } catch (error) {
          console.error('로컬스토리지 업데이트 에러:', error)
        }
      },
      
      shouldFetchNewData: (tab, search, department) => {
        const state = get()
        const now = Date.now()
        
        // 캐시가 만료되었거나, 검색 조건이 변경되었을 때 true 반환
        return !state.lastFetched || 
               now - state.lastFetched > state.cacheTimeout ||
               tab !== state.activeTab ||
               search !== state.searchTerm ||
               department !== state.selectedDepartment
      },
    }),
    {
      name: 'Notice Store' // Redux DevTools에서 표시될 스토어 이름
    }
  )
)

export default useNoticeStore