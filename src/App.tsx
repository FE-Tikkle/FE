import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_ID } from './store/slices/constant'
const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
}
const CLIENT_ID = GOOGLE_ID
const router = createMemoryRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <Home />,
  },
])

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App
