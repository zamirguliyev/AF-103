import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminNavbar from './components/Admin/AdminNavbar';
import UserNavbar from './components/User/UserNavbar';
import ProductList from './components/User/ProductList';
import ProductDetail from './components/User/ProductDetail';
import Basket from './components/User/Basket';
import Login from './components/User/Login';
import Register from './components/User/Register';
import AdminProductList from './components/Admin/AdminProductList';
import AddProductForm from './components/Admin/AddProductForm';
import AdminUserList from './components/Admin/AdminUserList';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            isLoggedIn ? (
              <>
                <AdminNavbar />
                <Routes>
                  <Route index element={<AdminProductList />} />
                  <Route path="products/add" element={<AddProductForm />} />
                  <Route path="products" element={<AdminProductList />} />
                  <Route path="users" element={<AdminUserList />} />
                </Routes>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/*"
          element={
            <>
              <UserNavbar />
              <Routes>
                <Route index element={<ProductList />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="basket" element={<Basket />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
