import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import KakaoLogin from './Pages/KakaoLogin'
import KakaoRedirectHandler from './Pages/KakaoRedirectHandler'
import { Provider } from 'react-redux'
import store from './Redux/store'

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
    path: ROUTE_PATH.LOGIN,
    element: <KakaoLogin />,
  },
  {
    path: ROUTE_PATH.OAUTH,
    element: <KakaoRedirectHandler />,
  },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
