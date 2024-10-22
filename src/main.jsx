import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import VerifyPage from './pages/VerifyPage.jsx'
import AuthLayout from './Components/AuthLayout.jsx'
import Recipe from './Components/Recipe/Recipe.jsx'
import Search from './Components/SearchRecipes/Search.jsx'
import Profile from './Components/Profile/Profile.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: (<AuthLayout authentication={false}>
                    <LoginPage />
                </AuthLayout>),

            },
            {
                path: "/signup",
                element: (<AuthLayout authentication={false}>
                    <SignupPage />
                </AuthLayout>),
            },
            {
                path: "/about",
                element: (<AuthLayout authentication={false}>
                    <AboutPage />
                </AuthLayout>),

            },
            {
                path: "/verify",
                element: (<AuthLayout authentication={false}>
                    <VerifyPage />
                </AuthLayout>),
            },
            {
                path: "/home",
                element: (<AuthLayout authentication>
                    {" "}
                    <HomePage />
                </AuthLayout>),
            },
            {
                path: "/search",
                element: (<AuthLayout authentication>
                    {" "}
                    <Search />
                </AuthLayout>),
            },
            {
                path: "/recipe/:mealid",
                element: (<AuthLayout authentication>
                    {" "}
                    <Recipe />
                </AuthLayout>)
            },
            {
                path: "/profile",
                element: (<AuthLayout authentication>
                    {" "}
                    <Profile/>
                </AuthLayout>)
            }

        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
