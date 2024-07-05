import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
}
const router = createMemoryRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <Home />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
