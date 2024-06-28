import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import KakaoRedirectHandler from './Pages/KakaoRedirectHandler'
const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  OAUTH: '/oauth',
}

const router = createMemoryRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <Home />,
  },

  {
    path: ROUTE_PATH.OAUTH,
    element: <KakaoRedirectHandler />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
