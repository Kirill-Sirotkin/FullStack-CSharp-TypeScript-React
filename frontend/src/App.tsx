import React from 'react'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Books from './pages/Books'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      ]
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App