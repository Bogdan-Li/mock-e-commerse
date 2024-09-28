import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
