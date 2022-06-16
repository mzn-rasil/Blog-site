import SignUpLayout from "../../ui/SignUpLayout";
import { useData } from "../../store/UserContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Error from "../../components/error/Error";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Enter password")
        .min("6", "Password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password doesn't match")
        .required("Enter your password again"),
})

function LoginStep1Page() {
    const { userData, setData } = useData();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    function submitHandler(data) {
        setData(data);
        navigate("../signUpStep2");
    }

    return (
        <SignUpLayout>
            <p className="flex justify-center text-sm">Already have an account?<Link className="text-blue-700 underline" to="/login">Log in</Link></p>
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(submitHandler)}>
                {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="form-label inline-block mb-2 text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            type="email"
                            autoComplete="email"
                            required
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors?.email?.message && 'border-red-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Email address"
                            {...register("email")}
                        />
                        <Error>{errors?.email?.message}</Error>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password" className="form-label inline-block mb-2 text-gray-700">
                            Password
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
                    </div>
                    <br />
                    <div>
                        <label htmlFor="confirm-password" className="form-label inline-block mb-2 text-gray-700">
                            Confirm Password
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

                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        </span>
                        Next
                    </button>
                </div>
            </form>
        </SignUpLayout>
    )
}

export default LoginStep1Page;