import { Link } from "react-router-dom";
import Container from "./Container";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="py-4 flex justify-between">
          <h1 className="text-3xl">Shop</h1>
          <div>
            <Link to={"/products"}>Products</Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
