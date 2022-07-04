import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ForgotPasswordLayout from "../../ui/ForgotPasswordLayout";
import * as yup from "yup";
import Error from "../../components/error/Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    email: yup
        .string("Email cannot be a number only")
        .email("Please enter a valid email")
        .required("Email is required")
});

function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: undefined,
        },
        resolver: yupResolver(schema),
        mode: "onBlur"
    })
    const navigate = useNavigate();

    async function submitHandler(data) {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/forgot_password`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const resJSON = await response.json();
            console.log(resJSON.message);

            if (!resJSON.message) {
                return setError("email", {
                    type: "focus",
                    message: resJSON.detail
                }, {
                    shouldFocus: true
                });
            }

            alert(resJSON.message);
            setIsLoading(false);
            navigate("./resendVerificationLink");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ForgotPasswordLayout>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="email-address"
                    className="form-label inline-block mb-2 text-gray-700"
                >Email address</label>
                <input
                    type="email"
                    id="email-address"
                    placeholder="Email address"
                    required
                    autoComplete="email"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors?.email?.message && 'border-red-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    {...register("email")}
                />
                <Error>{errors?.email?.message}</Error>

                <button
                    type="submit"
                    className="w-full mt-5 bg-indigo-500 p-2 rounded-md text-white font-semibold text-sm"
                >
                    {
                        isLoading ?
                            <div className="flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 animate-spin mr-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Redirecting...
                            </div>
                            :
                            <>
                                Send Verification Link
                            </>
                    }
                </button>
            </form>
        </ForgotPasswordLayout>
    );
}

export default ForgotPassword;