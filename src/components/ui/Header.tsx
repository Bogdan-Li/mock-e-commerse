import { Link } from "react-router-dom";
import Container from "./Container";
import toast from "react-hot-toast";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const Header = () => {
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    toast.success("Logged out successfully");
  };

  return (
    <header>
      <Container>
        <div className="py-4 flex justify-between">
          <h1 className="text-3xl">Shop</h1>
          <div className="space-x-4">
            <Link to={"/products"}>Products</Link>
            <Link to={"/categories"}>Categories</Link>
            {!token && <Link to={"/login"}>Log In</Link>}
            {token && <button onClick={logout}>Log out</button>}
            {token && <Link to={"/new"}>New Product</Link>}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
