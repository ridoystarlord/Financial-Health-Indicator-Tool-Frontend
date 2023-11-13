import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { REGISTER_USER } from "../mutations/user";

const schema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email().min(1, "Email is Required"),
  password: z.string().min(1, "Password is Required"),
  companyName: z.string().min(1, "Company Name is Required"),
});

type FormData = z.infer<typeof schema>;
const defaultValues: FormData = {
  name: "",
  email: "",
  password: "",
  companyName: "",
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  });
  const [registerUser] = useMutation(REGISTER_USER);

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const result = await registerUser({
        variables: { ...data },
      });

      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              {...register("companyName", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.companyName && (
              <span className="text-red-500">{errors.companyName.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
