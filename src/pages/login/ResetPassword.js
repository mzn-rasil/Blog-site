import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ForgotPasswordLayout from "../../ui/ForgotPasswordLayout";
import * as yup from "yup";
import Error from "../../components/error/Error";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
    password: yup
        .string()
        .required("Enter password")
        .min("6", "Password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password doesn't match")
        .required("Enter your password again"),
});

function ResetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            password: undefined,
            confirmPassword: undefined,
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    });
    const [resetCode, setResetCode] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    async function submitHandler(data) {
        try {
            const res = await fetch(`http://127.0.0.1:8000/user/forgot_password/${resetCode}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const resJSON = await res.json();

            resJSON
                .then(finalData => {
                    console.log(finalData);
                    alert("Your password has been reset");
                    navigate("/login");
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let resetCode = searchParams.get("reset_code");
        setResetCode(resetCode);
    }, [searchParams]);

    return (
        <ForgotPasswordLayout>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="password" className="form-label inline-block mb-2 text-gray-700">
                    New Password
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors?.password?.message && 'border-red-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Password"
                    {...register("password")}
                />
                <Error>{errors?.password?.message}</Error>

                <br />

                <div>
                    <label htmlFor="confirm-password" className="form-label inline-block mb-2 text-gray-700">
                        Retype Password
                    </label>
                    <input
                        id="confirm-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors?.confirmPassword?.message && 'border-red-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        placeholder="Confirm Password"
                        {...register("confirmPassword")}
                    />
                    <Error>{errors?.confirmPassword?.message}</Error>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        </span>
                        Submit
                    </button>
                </div>
            </form>
        </ForgotPasswordLayout>
    );
}

export default ResetPassword;