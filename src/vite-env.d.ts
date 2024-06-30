/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KAKAO_KEY: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_NAVER_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
