import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValues, signUpSchema } from "@/validation/signUpSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { Loader } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";

// const fetchData = async () => {
//   const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
//   return data;
// };
const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { isAuthenticated, login } = useAuthStore();
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['todo'],
  //   queryFn: fetchData,
  // });
  // if (isLoading) return <div>Loading...</div>;

  // console.log(data,"DATA");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setLoading(true);
    const signUpdata = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post("/api/signup", signUpdata); // No need for full URL
      console.log(response.data);

      toast.success("Signup successful!");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error("Signup fail!", error.response.data);
      } else {
        console.error("Signup error", error);
        toast.error("An error occurred during signup", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // login();

  // if (isAuthenticated) {
  //   navigate("/overview");
  // } else {
  //   navigate("/sign-in");
  // }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto py-4">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign-Up
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="flex items-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="email"
                      id="email"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="flex items-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="password"
                      id="password"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="flex items-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="password"
                      id="confirm-password"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-slate-300 text-[#111827]  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
