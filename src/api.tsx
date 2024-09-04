import axios, { AxiosInstance, AxiosError } from 'axios'
import GoogleAuthBody from './store/slices/authslice'
import qs from 'qs'
import { Recruitment } from './store/Rec'

const BASE_URL = 'https://api.tikkeul.site'

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
})

const Google_BASE_URL = 'https://oauth2.googleapis.com/token'

interface Postsign {
  code: string
}
interface GoogleAuthBody {
  client_id: string
  client_secret: string
  code: string
  grant_type: string
  redirect_uri: string
}
// 토큰 갱신 응답의 타입 정의
interface TokenRefreshResponse {
  access_token: string
}

// 리프레시 토큰으로 새로운 액세스 토큰을 요청하는 함수
const refreshAccessToken = async (
  refreshToken: string
): Promise<TokenRefreshResponse> => {
  const response = await axios.post<TokenRefreshResponse>(
    `${BASE_URL}/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )
  return response.data
}

// 요청 인터셉터 추가: 액세스 토큰을 요청 헤더에 첨부
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가: 409 오류를 처리하고 토큰을 갱신
axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    // 오류가 409 Conflict이고 원래 요청 설정이 있는 경우 토큰 갱신 시도
    if (error.response?.status === 409 && originalRequest) {
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다')
        }

        // 새로운 액세스 토큰 요청
        const { access_token: newAccessToken } = await refreshAccessToken(
          refreshToken
        )

        // 로컬 스토리지에 새로운 액세스 토큰 저장
        localStorage.setItem('access_token', newAccessToken)

        // 원래 요청의 Authorization 헤더 업데이트
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        // 원래 요청 재시도
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('토큰 갱신 오류:', refreshError)
        // 토큰 갱신 실패 시 추가 처리 (예: 사용자 로그아웃)
        // TODO: 로그아웃 로직 구현
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
export function postsign(code: string, provider: string) {
  const postCode: Postsign = { code }

  return axios
    .post(
      `${BASE_URL}/auth/sign?provider=${provider}`,
      {},
      {
        headers: {
          Authorization: `${postCode.code}`,
        },
      }
    )
    .then(res => {
      const authData = {
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        is_new: res.data.is_new,
      }
      if (
        window.opener &&
        (provider === 'kakao' || provider === 'naver' || provider === 'google')
      ) {
        window.opener.postMessage(authData, '*')
        console.log('Auth data sent to parent window:', authData)
        window.close()
      }
    })
    .catch(error => {
      alert('로그인을 다시 시도해주세요.')
      throw error
    })
}

export const postgoogleAuth = (googleAuthData: GoogleAuthBody) => {
  if (!googleAuthData) {
    console.log('Google authentication data is missing')
    return Promise.reject(new Error('Google authentication data is missing'))
  }

  return axios
    .post(`${Google_BASE_URL}`, qs.stringify(googleAuthData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => {
      console.log('Token', res.data)
      return postsign(res.data.access_token, 'google')
    })
    .catch(error => {
      console.error('Google Auth Error:', error.response?.data || error.message)
      alert('로그인을 다시 시도해주세요')
      throw error
    })
}

axiosInstance.interceptors.request.use(
  request => {
    const accessToken = localStorage.getItem('access_token')
    console.log(accessToken)
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

export const postUserData = async (userData: {
  name: string
  university: string
  department: string
  subscribe_notices: string[]
  terms_of_service_agreement: boolean
  personal_information_collection_agreement: boolean
  promotion_and_information_receipt_agreement: boolean
}): Promise<void> => {
  try {
    await axiosInstance.post('/user', userData)
  } catch (error) {
    console.error('Error posting user data:', error)
    throw error
  }
}
export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(
    'https://api.tikkeul.site/auth/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )
  return response.data
}
export interface Notice {
  id: string // 공지사항의 고유 ID
  department: string
  title: string
  created_at: string
  is_bookmarked: boolean
  index: string
  top: boolean
  url: string
}

export interface NoticeResponse {
  data: Notice[]
  tagList: string[]
}

export const getNoticeFiltered = async (
  size: number,
  page: number,
  tag: string,
  query: string,
  site: string // New parameter
): Promise<NoticeResponse> => {
  try {
    const response = await axiosInstance.get<NoticeResponse>(
      '/notice/filtered',
      {
        params: {
          size,
          page,
          tag,
          query,
          site, // Use the site parameter
        },
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching notices:', error)
    throw error
  }
}

export const getNoticeSite = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<string[]>('/notice/university')
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error fetching site notices:', error)
    throw error
  }
}

export const getNoticeDepartment = async (
  school: string
): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<string[]>(
      `/notice/department?university=${encodeURIComponent(school)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching department notices:', error)
    throw error
  }
}

export const getNoticeDepartment2 = async (
  school: string
): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<string[]>(
      `/notice/site?university=${encodeURIComponent(school)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching department notices:', error)
    throw error
  }
}
export const toggleBookmark = async (id: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/notice/bookmark', { id })
    return response.data.is_bookmarked
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    throw error
  }
}

export const fetchRecruitments = async (
  size: number,
  page: number,
  tag: string,
  query: string
): Promise<Recruitment[]> => {
  try {
    const response = await axiosInstance.get('/saramin/filtered', {
      params: {
        size, // Number of items per page
        page,
        tag,
        query,
      },
    })
    return response.data.data.map((item: any) => ({
      id: item.id, // Ensure the id is present
      url: item.url,
      company_img: item.company_image,
      company: item.company,
      dday: item.deadline_left,
      titles: [item.title],
      experience: item.experience,
      jobType: item.job_type,
      location: item.location,
      education: item.education,
      deadline: item.deadline,
      jobcate: item.job_category,
      bookmark: item.is_bookmarked,
    }))
  } catch (error) {
    console.error('Error fetching recruitment data:', error)
    return []
  }
}
interface CompanyInfo {
  name: string
  url: string
}

export const fetchFallbackImage = async (
  companyInfo: CompanyInfo
): Promise<string> => {
  try {
    const response = await axiosInstance.post('/image', {
      company: [companyInfo],
    })
    return response.data.imageUrl
  } catch (error) {
    console.error('Error fetching fallback image:', error)
    throw error
  }
}
export const toggleBookmark2 = async (id: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/saramin/bookmark', { id })
    return response.data.is_bookmarked
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    throw error
  }
}
export const postContentsRequest = async (
  contentsType: string,
  contents_id: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      '/log',
      { contents_id },
      {
        params: {
          contents_type: contentsType,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in postContentsRequest:', error)
    throw error
  }
}

export const getSaraminTags = async (): Promise<Record<string, string[]>> => {
  try {
    const response = await axiosInstance.get('/saramin/tag')
    return response.data
  } catch (error) {
    console.error('Error fetching Saramin tags:', error)
    throw error
  }
}

export interface BookmarkedNotice {
  id: string
  title: string
  created_at: string
  url: string
}

export interface BookmarkedNoticeResponse {
  page: number
  size: number
  total: number
  total_pages: number
  has_next: boolean
  data: BookmarkedNotice[]
}

// getBookmarkedNotices 함수는 특정 페이지와 해당 페이지에 대한 데이터를 반환
export const getBookmarkedNotices = async (
  size: number,
  page: number,
  startDate: string,
  endDate: string
): Promise<BookmarkedNoticeResponse> => {
  try {
    const response = await axiosInstance.get<BookmarkedNoticeResponse>(
      '/notice/bookmark',
      {
        params: {
          size,
          page,
          start_date: startDate,
          end_date: endDate,
        },
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching bookmarked notices:', error)
    throw error
  }
}

export interface BookmarkedSaramin {
  id: string
  title: string
  created_at: string
  url: string
}

export interface BookmarkedSaraminResponse {
  page: number
  size: number
  total: number
  total_pages: number
  has_next: boolean
  data: BookmarkedSaramin[]
}

export const getBookmarkedSaramin = async (
  size: number,
  page: number,
  startDate: string,
  endDate: string
): Promise<BookmarkedSaraminResponse> => {
  try {
    const response = await axiosInstance.get<BookmarkedSaraminResponse>(
      '/saramin/bookmark',
      {
        params: {
          size,
          page,
          start_date: startDate,
          end_date: endDate,
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 오류 상세:', {
        메시지: error.message,
        상태: error.response?.status,
        상태텍스트: error.response?.statusText,
        헤더: error.response?.headers,
        데이터: error.response?.data,
      })
    } else {
      console.error('예상치 못한 오류:', error)
    }
    throw error
  }
}

export interface BookmarkStats {
  notice: number
  saramin: number
}

export const getBookmarkStats = async (): Promise<BookmarkStats> => {
  try {
    const response = await axiosInstance.get<BookmarkStats>(
      '/user/bookmark/stat'
    )
    console.log('Fetching bookmark stats:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching bookmark stats:', error)
    throw error
  }
}

export interface UserData {
  id: string
  name: string
  provider: string
  university: string
  central_site: string | null
  department: string
  subscribe_notices: string[]
  subscribe_notices_without_filter: string[]
  subscribe_saramin: string[] | null
  bookmarked_link: string[]
  bookmarked_notices: string[]
  bookmarked_saramin: string[]
}

export const getUserData = async (): Promise<UserData> => {
  try {
    const response = await axiosInstance.get<UserData>('/user')
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

interface UpdateUniversityData {
  university: string
  department: string
  subscribe_notices: string[]
}

export const updateUserUniversity = async (
  data: UpdateUniversityData
): Promise<void> => {
  try {
    await axiosInstance.patch('/user/university', data)
    console.log('update:',data);
  } catch (error) {
    console.error('Error updating user university data:', error)
    throw error
  }
}

interface SaraminSubscriptions {
  [key: string]: string[]
}

export const updateUserSaraminSubscriptions = async (
  subscriptions: SaraminSubscriptions
): Promise<void> => {
  try {
    await axiosInstance.patch('/user/saramin', {
      subscribe_saramin: subscriptions,
    })
    console.log('Saramin 구독 정보가 성공적으로 업데이트되었습니다.')
  } catch (error) {
    console.error('Saramin 구독 정보 업데이트 중 오류 발생:', error)
    throw error
  }
}

export const deleteUser = async (): Promise<void> => {
  try {
    await axiosInstance.delete('/auth/user');
    console.log('사용자 계정이 성공적으로 삭제되었습니다.');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('사용자 삭제 중 오류 발생:', {
        메시지: error.message,
        상태: error.response?.status,
        상태텍스트: error.response?.statusText,
        데이터: error.response?.data,
      });
    } else {
      console.error('예상치 못한 오류:', error);
    }
    throw error;
  }
};