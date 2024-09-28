import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "../../../lib/types/products.types";
import url from "../../../lib/url";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  description: string;
  price: number;
  categoryId: number;
};

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const NewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const body = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        categoryId,
      };

      const res = await fetch(`${url}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      toast.success("Product created successfully", {
        position: "bottom-right",
      });

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/categories`);

      const data = await res.json();

      setCategories(data);
    })();
  }, []);

  return (
    <main className="h-screen grid place-items-center">
      <div>
        <h1 className="text-3xl font-bold">New Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <label className="grid gap-4">
            Name
            <input
              {...register("name", { required: true })}
              className="px-4 py-2 outline-none border border-indigo-300 focus:border-indigo-600 rounded-lg"
              type="text"
            />
          </label>
          <label className="grid gap-4">
            Description
            <input
              {...register("description", { required: true })}
              className="px-4 py-2 outline-none border border-indigo-300 focus:border-indigo-600 rounded-lg"
              type="text"
            />
          </label>
          <label className="grid gap-4">
            Price
            <input
              {...register("price", { required: true })}
              className="px-4 py-2 outline-none border border-indigo-300 focus:border-indigo-600 rounded-lg"
              type="number"
            />
          </label>
          <label className="grid gap-2">
            Category
            <select
              onChange={(e) => setCategoryId(Number(e.target.value))}
              name=""
              id=""
              className="px-4 py-2 rounded-lg"
            >
              {!categories ? (
                <option value="">Loading</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </label>
          <button className="px-4 py-2 bg-indigo-100 rounded-lg">Create</button>
        </form>
      </div>
    </main>
  );
};

export default NewProduct;
