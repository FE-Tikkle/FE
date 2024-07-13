import React, { ReactNode } from 'react'

interface MainConatainerProps {
  children: ReactNode
}

const MainContainer: React.FC<MainConatainerProps> = ({ children }) => {
  return (
    <>
      <div className="main-conatainer">{children}</div>
      <div className="main-bottom-container"></div>
    </>
  )
}
export default MainContainer
