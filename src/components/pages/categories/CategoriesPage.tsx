import { useEffect, useState } from "react";
import { Category } from "../../../lib/types/products.types";
import Container from "../../ui/Container";
import url from "../../../lib/url";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/categories`);
      const data: Category[] = await res.json();

      setCategories(data);
    })();
  }, []);
  return (
    <Container>
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="grid grid-cols-2 gap-4">
        {!categories ? (
          <>Loading</>
        ) : (
          categories.map((category) => (
            <div className="p-4 bg-gray-200 rounded-lg" key={category.id}>
              <h1>{category.name}</h1>
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default CategoriesPage;
