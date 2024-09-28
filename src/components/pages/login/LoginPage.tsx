import { useForm } from "react-hook-form";
import url from "../../../lib/url";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.accessToken) {
        if (remember) {
          localStorage.setItem("token", result.accessToken);
        } else {
          sessionStorage.setItem("token", result.accessToken);
        }

        navigate("/");
        toast.success("Login successful", { position: "bottom-right" });
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong", { position: "bottom-right" });
    }
  };

  return (
    <main className="h-screen grid place-items-center">
      <div className="space-y-4 p-4 bg-gray-200 rounded-lg">
        <h1 className="text-3xl font-bold text-center'">Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <label className="grid">
            Email
            <input
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email is not valid";
                  } else {
                    return true;
                  }
                },
              })}
              className="p-2 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </label>
          <label className="grid">
            Password
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
              className="p-2 border border-gray-300 rounded-lg"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </label>
          <label className="flex space-x-2">
            <input
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              type="checkbox"
              name=""
            />
            <p>Remember me</p>
          </label>
          <button className="bg-green-200 px-4 py-2 rounded-lg">Log in</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
