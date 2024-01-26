import About from "../pages/User/About";
import Home from "../pages/User/Home";
import Contact from "../pages/User/Contact";
import UserRoot from "../pages/User/UserRoute"
import AdminRoot from "../pages/Admin/AdminRoute";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import Suppliers from "../pages/Admin/Suppliers";
import Product from "../pages/Admin/Product";

export const ROUTES = [
    {
        path: '/',
        element: <UserRoot/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'about',
                element: <About/>
            },
            {
                path: 'contact',
                element: <Contact/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminRoot/>,
        children: [
            {
                path: '',
                element: <Dashboard/>
            },
            {
                path: 'products',
                element: <Products/>
            },
            {
                path: 'suppliers',
                element: <Suppliers/>
            },
            {
                path: 'product/:id',
                element: <Product/>
            }
        ]
    }
]