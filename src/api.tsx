import axios from 'axios'
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
  query: string
): Promise<NoticeResponse> => {
  try {
    const response = await axiosInstance.get<NoticeResponse>(
      '/notice/filtered?site=전체공지',
      {
        params: {
          size,
          page,
          tag,
          query,
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
