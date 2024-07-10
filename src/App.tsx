import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import { ThemeProvider } from './assets/Theme/ThemeContext'
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
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
