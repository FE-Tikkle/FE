import React, { ReactNode } from 'react'

interface MainConatainerProps {
  children: ReactNode
}

const MainContainer: React.FC<MainConatainerProps> = ({ children }) => {
  return (
    <>
      <div className="main-conatainer">{children}</div>
    </>
  )
}
export default MainContainer
