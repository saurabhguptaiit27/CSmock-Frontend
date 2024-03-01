import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Faqs from './components/FAQs/Faqs.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import IntExperiences from './components/IntExperiences/IntExperiences.jsx'
import OurExperts from './components/OurExperts/OurExperts.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"ourexperts",
        element:<OurExperts/>
      },
      {
        path:"interviewexperiences",
        element:<IntExperiences/>
      },
      {
        path:"FAQs",
        element:<Faqs/>
      },
      {
        path:"Register",
        element:<Register/>
      },
      {
        path:"Login/",
        element:<Login/>
      },
      {
        path:"Login/Register",
        element:<Register/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
