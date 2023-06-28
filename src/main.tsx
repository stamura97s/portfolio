import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom'

import Home from './components/Home'
import Work01 from './components/Work01'
import Work02 from './components/Work02'
import Work03 from './components/Work03'

const Root = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: 'portfolio',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work01', element: <Work01 /> },
      { path: 'work02', element: <Work02 /> },
      { path: 'work03', element: <Work03 /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
