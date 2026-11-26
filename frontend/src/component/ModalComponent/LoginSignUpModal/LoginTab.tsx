import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Mail, Lock } from "lucide-react"; 
import { queryClient } from "../../../App";
import { SignInValidation } from "../../../schema/validationSchema.ts";
import { type SignInFormData } from "../../../schema/validationSchema.ts";
import api from "../../../api/axios.ts";

const LoginTab = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  
    const handleLogin = useCallback(
        async (values: SignInFormData) => {
            const response = await api.post("/login", values);
            return response;
        },
        []
    );
    const { isPending, isError, error, mutate } = useMutation({
        mutationFn: handleLogin,
        onSuccess: (data) => {
            queryClient.setQueryData(["me"], data);
            onClose();
        }
    });

    const formik = useFormik({
        initialValues: { userID: "", password: "" },
        validationSchema: SignInValidation,
        onSubmit: mutate,
    });
    const { values, errors, handleChange, handleBlur, handleSubmit, touched } = formik;

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">

            {/* Email Field */}
            <div>
                <label
                    htmlFor="userID"
                    className="mb-2 block text-sm    text-text_label"
                >
                    UserID / Email
                </label>

                <div
                    className={`flex items-center gap-3 rounded-lg
              border px-3 py-3 transition-all
              focus-within:ring-2 focus-within:ring-purple-500
              ${touched.userID && errors.userID
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                >
                    <Mail
                        size={20}
                        className="shrink-0 text-text_label"
                    />

                    <input
                        id="userID"
                        name="userID"
                        type="text"
                        value={values.userID}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="jonas_kahnwald@gmail.com"
                        className="w-full min-w-0 bg-transparent
                text-sm text-text_primary outline-none
                placeholder:text-gray-400"
                    />
                </div>

                {touched.userID && errors.userID && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.userID}
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm text-text_label"
                >
                    Password
                </label>

                <div
                    className={`flex items-center gap-3 rounded-lg
              border px-3 py-3 transition-all
              focus-within:ring-2 focus-within:ring-purple-500
              ${touched.password && errors.password
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                >
                    <Lock
                        size={20}
                        className="shrink-0 text-text_label"
                    />

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                        className="w-full min-w-0 bg-transparent
                text-sm text-text_primary outline-none
                placeholder:text-gray-400"
                    />
                </div>

                {touched.password && errors.password && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Sign In Button */}
            <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-lg bg-indigo-500
            py-3 font-semibold text-white
            transition-all hover:bg-indigo-800
            active:scale-[0.98]
            cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign In
          </button>
           
            {
                isError &&
                <p className="text-red-500 text-center">{error.message}</p>
            }
        </form>
    )

};

export default LoginTab;