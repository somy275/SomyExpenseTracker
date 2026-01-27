
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AppLayout from './components/Layout/AppLayout'
import { PublicRoute } from './pages/auth/Route/PublicRoute'
import { PrivateRoute } from "./pages/auth/Route/PrivateRoute"
import Profile from "./pages/Dashboard/Profile"
import Statistics from "./components/ProfileLayout/Statistics"
import Profile_Setting from "./components/ProfileLayout/Profile_Setting"
import { useState } from "react"
// import { useDispatch } from "react-redux"
import { LastActive } from "./Store/LastActive"
import Profile_status from "./components/ProfileLayout/Profile_status"
import ForgotPassword from "./components/ProfileLayout/ForgotPassword"
import TokenVerify from "./components/ProfileLayout/TokenVerify"
import New_Password from "./components/ProfileLayout/New_Password"
import VerifyEmailLink from "./components/ProfileLayout/VerifyEmailLink"
import EmailVerifyCode from "./components/ProfileLayout/EmailVerifyCode"
import Setting from "./pages/Dashboard/Setting"
import Welcome from "./UI/Welcome"
import { useEffect } from "react"




const App = () => {
  const [Animation, setAnimation] = useState(true)

useEffect(()=>{
  const id=setTimeout(() => {
    setAnimation(false)
  }, [5000])
  return ()=>clearTimeout(id);
},[])
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><AppLayout /></PrivateRoute>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/income",
          element: <Income />
        },
        {
          path: "/expenses",
          element: <Expense />
        },
        {
          path: "/profile",
          element: <Profile />,
          children: [
            {
              index: true,
              element: <Profile_status />,

            },
            {
              path: "Userprofile",
              element: <Profile_status />,
            },
            {
              path: "statistics",
              element: <Statistics />
            },
            {
              path: "profile-setting",
              element: <Profile_Setting />
            },



          ]
        },
        {
          path: "/setting",
          element: <Setting />
        },

        {
          path: "/VerifyEmail/:token",
          element: <VerifyEmailLink />
        },
        {
          path: "/VerifyEmailCode",
          element: <EmailVerifyCode />
        }

      ]
    },
    {
      path: "/login",
      element: (<PublicRoute><Login /></PublicRoute>)
    },
    {
      path: "/signup",
      element: <PublicRoute><Signup /></PublicRoute>
    },
    {
      path: "/Forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/resetPassword/:token",
      element: <PublicRoute> <TokenVerify /></PublicRoute>
    },
    {
      path: "/New_Password",
      element: <PublicRoute> <New_Password /></PublicRoute>
    }
  ])
  return (
    <>
    {/* <RouterProvider router={router} /> */}
{
  Animation?<Welcome/>:<RouterProvider router={router} />
}
      
    </>
  )
}

export default App

