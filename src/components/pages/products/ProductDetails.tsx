import { useEffect, useState } from "react";
import Container from "../../ui/Container";
import { Product, Review } from "../../../lib/types/products.types";
import url from "../../../lib/url";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/products/${id}`);
      const data: Product = await res.json();
      setProduct(data);
    })();
  }, []);

  useEffect(() => {
    if (product) {
      (async () => {
        const res = await fetch(`${url}/categories/${product.categoryId}`);
        const data = await res.json();

        setCategory(data.name);
      })();
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      (async () => {
        const res = await fetch(`${url}/reviews?productId=${product.id}`);
        const data = await res.json();

        setReviews(data);
      })();
    }
  }, [product]);

  return (
    <main>
      <Container>
        <h1 className="text-3xl font-bold">
          {product?.name ? product.name : "Loading..."}
        </h1>
        <div className="space-y-4 my-6">
          <p>{product?.description ? product.description : "Loading..."}</p>
          <p>{product?.price ? product.price : "Loading..."}</p>
        </div>
        <p>Category: {category ? category : "Loading..."}</p>
        <div>
          {!reviews ? (
            <>Loading</>
          ) : (
            reviews.map((review) => (
              <div key={review.id}>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))
          )}
        </div>
      </Container>
    </main>
  );
};

export default ProductDetailsPage;
