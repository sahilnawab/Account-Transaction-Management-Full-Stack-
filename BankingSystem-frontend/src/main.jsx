import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import store from './store/store.js'
import UserData from './components/UserData.jsx'
import Register from './components/Register.jsx'
import AuthenticationLayout from './components/AuthenticationLayout.jsx'
import Dashboard from './components/Dashboard.jsx'
import AccountForm from './components/AccountForm.jsx'
import Logout from './components/Logout.jsx'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: '/',
      element:(
      <AuthenticationLayout authenticationRequired={true}>
      <Dashboard />
      </AuthenticationLayout>
      )
    },{
      path: '/dashboard',
      element: (
        <AuthenticationLayout authenticationRequired={true}>
          <Dashboard />
        </AuthenticationLayout>
      )
    },
    {
      path: "/login",
      element: (
          <AuthenticationLayout authenticationRequired={false}>
              <Login />
          </AuthenticationLayout>
      ),
  },{
    path:"logout",
    element :(
      <AuthenticationLayout authenticationRequired={true}>
        <Logout/>
      </AuthenticationLayout>
    )
  }
  , {
      path: '/all-user',
      element: (
        <AuthenticationLayout authenticationRequired={true}>
          <UserData />
        </AuthenticationLayout>
      )
    }, {
      path: "/register",
      element: (
          <AuthenticationLayout authenticationRequired={false}>
              <Register />
          </AuthenticationLayout>
      )
    },
    {
        path:"new-account",
        element: (
            <AuthenticationLayout authenticationRequired={true}>
              <AccountForm />
            </AuthenticationLayout>
        )
    }
    ,
    
    {
      path: "*",
      element: <h1>404 Not Found</h1>
    }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
)
