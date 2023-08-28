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
import Authentication from './pages/Authentication'
import Profile from './pages/Profile'
import Registration from './pages/Registration'

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
      {
        path: "/auth",
        element: <Authentication />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
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