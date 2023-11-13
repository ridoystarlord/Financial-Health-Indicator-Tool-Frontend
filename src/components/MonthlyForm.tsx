import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { CREATE_MONTHLY_DATA } from "../mutations/company";
import { getToken } from "../utils/common";

// Define your Zod schema for validation
const schema = z.object({
  income: z.number(),
  expenses: z.number(),
  debts: z.number(),
  assets: z.number(),
  monthName: z.string(),
});

type FormData = z.infer<typeof schema>;

const BudgetForm: React.FC = () => {
  const token = getToken();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [createBudget] = useMutation(CREATE_MONTHLY_DATA, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createBudget({
        variables: { ...data },
      });
      console.log(result.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        console.error("Error:", error?.message);
      }
    }
  };

  return (
    // <div className="bg-gray-100 h-screen flex items-center justify-center">
    <div className="bg-white p-8  w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Enter Monthly Data
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Income
          </label>
          <input
            type="number"
            {...register("income", {
              required: "Income is required",
              valueAsNumber: true,
            })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.income ? "border-red-500" : ""
            }`}
          />
          {errors.income && (
            <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Expenses
          </label>
          <input
            type="number"
            {...register("expenses", {
              required: "Expenses are required",
              valueAsNumber: true,
            })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.expenses ? "border-red-500" : ""
            }`}
          />
          {errors.expenses && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expenses.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Debts
          </label>
          <input
            type="number"
            {...register("debts", {
              required: "Debts are required",
              valueAsNumber: true,
            })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.debts ? "border-red-500" : ""
            }`}
          />
          {errors.debts && (
            <p className="text-red-500 text-sm mt-1">{errors.debts.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Assets
          </label>
          <input
            type="number"
            {...register("assets", {
              required: "Assets are required",
              valueAsNumber: true,
            })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.assets ? "border-red-500" : ""
            }`}
          />
          {errors.assets && (
            <p className="text-red-500 text-sm mt-1">{errors.assets.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Month Name
          </label>
          <input
            type="text"
            {...register("monthName", { required: "Month Name is required" })}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors.monthName ? "border-red-500" : ""
            }`}
          />
          {errors.monthName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.monthName.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Analyze
        </button>
      </form>
    </div>
    // </div>
  );
};

export default BudgetForm;
