import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="flex justify-center flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">Welcom</h1>
      <Link to="/products" className="bg-green-200 px-4 py-2 rounded-lg">
        Go to Products
      </Link>
    </main>
  );
};

export default HomePage;
