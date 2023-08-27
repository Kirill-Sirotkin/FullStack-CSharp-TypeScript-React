import React from 'react'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Books from './pages/Books'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'
import Book from './pages/Book'
import Authors from './pages/Authors'
import Author from './pages/Author'

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
      {
        path: "/books/:id",
        element: <Book />,
      },
      {
        path: "/authors",
        element: <Authors />,
      },
      {
        path: "/authors/:id",
        element: <Author />,
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