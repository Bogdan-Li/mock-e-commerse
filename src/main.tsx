import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage.tsx";
import ProductsPage from "./components/pages/products/ProductsPage.tsx";
import ProductDetailsPage from "./components/pages/products/ProductDetails.tsx";
import Layout from "./components/layout/layout.tsx";
import CategoriesPage from "./components/pages/categories/CategoriesPage.tsx";
import LoginPage from "./components/pages/login/LoginPage.tsx";
import NewProduct from "./components/pages/newProduct/NewProduct.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductDetailsPage /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/new",
        element: <NewProduct />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
