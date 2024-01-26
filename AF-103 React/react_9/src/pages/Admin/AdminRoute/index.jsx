import AdminNavbar from "../../../components/Admin/Navbar";
import AdminFooter from "../../../components/Admin/Footer";
import { Outlet } from "react-router-dom";

const AdminRoot = () => {
  return (
    <>
        <AdminNavbar/>
        <Outlet/>
        <AdminFooter/>
    </>
  )
}

export default AdminRoot