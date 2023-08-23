import React from 'react'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Books from './pages/Books'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App