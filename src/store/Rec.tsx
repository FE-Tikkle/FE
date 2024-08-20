// src/types.ts
export interface Recruitment {
  id: string // Ensure that the id is included
  url: string
  company_img: string
  company: string
  dday: string
  titles: string[]
  tags: string[]
  info: { label: string; value: string }[]
}
