import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  price: number;
};

const ProductCard = ({ id, name, price }: Props) => {
  return (
    <Link to={`/products/${id}`} className="p-4 bg-gray-200 rounded-lg">
      <h1>{name}</h1>
      <p>{price} USD</p>
    </Link>
  );
};

export default ProductCard;
