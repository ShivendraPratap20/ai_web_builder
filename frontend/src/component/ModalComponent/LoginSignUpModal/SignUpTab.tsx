import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { queryClient } from "../../../App";
import { User, Mail, Phone, Lock, ShieldCheck, } from "lucide-react";
import { SignUpValidationSchema, type SignUpFormData } from "../../../schema/validationSchema";
import api from "../../../api/axios";


const SignUpTab = ({ onClose }: { onClose: () => void }): React.JSX.Element => {

    const handleSignUp = useCallback(
        async (values: SignUpFormData) => {
            const response = await api.post("/signup", values);
            return response;
        },
        []
    );

    const { isPending, isError, error, mutate } = useMutation({
        mutationFn: handleSignUp,
        onSuccess: (data) => {
            queryClient.setQueryData(["me"], data);
            onClose();
        },
    });

    const formik = useFormik({
        initialValues: {
            userName: "",
            userID: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: SignUpValidationSchema,
        onSubmit: mutate,
    });

    const { values, errors, handleChange, handleBlur, handleSubmit, touched } = formik;



    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Heading */}
            <div className="mb-5 space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-text_primary mt-5">
                    Create Account
                </h2>
                <p className="text-sm text-text_label">
                    Join StreamVibe and enjoy unlimited entertainment.
                </p>
            </div>

            {/* Form Fields */}
            {[
                {
                    name: "userName",
                    label: "Full Name",
                    placeholder: "Enter your full name",
                    type: "text",
                    icon: <User size={20} />,
                },
                {
                    name: "userID",
                    label: "Email Address",
                    placeholder: "jonas_kahnwald@gmail.com",
                    type: "email",
                    icon: <Mail size={20} />,
                },
                {
                    name: "phoneNumber",
                    label: "Phone Number",
                    placeholder: "Enter 10 digit phone number",
                    type: "tel",
                    icon: <Phone size={20} />,
                },
                {
                    name: "password",
                    label: "Password",
                    placeholder: "Create a password",
                    type: "password",
                    icon: <Lock size={20} />,
                },
                {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    placeholder: "Re-enter your password",
                    type: "password",
                    icon: <ShieldCheck size={20} />,
                },
            ].map((field) => {
                const hasError = Boolean(
                    touched[field.name] && errors[field.name]
                );

                return (
                    <div key={field.name}>
                        <label
                            htmlFor={field.name}
                            className="mb-2 block text-sm font-semibold text-text_label"
                        >
                            {field.label}
                        </label>

                        <div
                            className={`flex items-center gap-3 rounded-lg
            border px-3 py-3 transition-all
            focus-within:ring-2 focus-within:ring-purple-500
            ${hasError
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                        >
                            <span className="shrink-0 text-text_label">
                                {field.icon}
                            </span>

                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={values[field.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={field.placeholder}
                                autoComplete={
                                    field.name === "userName"
                                        ? "name"
                                        : field.name === "userID"
                                            ? "email"
                                            : field.name === "phoneNumber"
                                                ? "tel"
                                                : field.name === "password"
                                                    ? "new-password"
                                                    : "new-password"
                                }
                                className="w-full min-w-0 bg-transparent
              text-sm text-text_primary outline-none
              placeholder:text-gray-400"
                            />
                        </div>

                        {hasError && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                );
            })}

            {/* Sign Up Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-purple-600
      py-3 font-semibold text-white
      transition-all hover:bg-purple-700
      active:scale-[0.98]
      disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending ? "Creating Account..." : "Create Account"}
            </button>


            {
                isError &&
                <p className="text-red-500 text-center">{error.message}</p>
            }

        </form>
    );

};

export default SignUpTab;