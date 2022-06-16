import LoginLayout from "../../ui/LoginLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import Error from "../../components/error/Error";

const schema = yup.object().shape({
    email: yup
        .string("Email cannot be a number only")
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
});

function LoginPage() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: undefined,
            password: undefined,
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    async function submitHandler(data) {
        // backend ma oauth2.py file ma as form-data save gareko le
        const formData = new FormData();
        formData.append("username", data.email); // backend ma email ko lagi username bhanera cha
        formData.append("password", data.password);
        console.log(formData);

        // Send a POST request to the server
        // esma files haru pathako chaina tara form data use garirako chu
        // kina bhane backend ma Form use gareko raixa
        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                body: formData,
            });
            const responseData = await response.json();
            console.log(responseData);

            if (responseData.access_token) {
                localStorage.setItem("token", `${responseData.token_type} ${responseData.access_token}`)
                navigate("../");
            } else {
                setError("emptyToken", {
                    type: "manual",
                    message: responseData.detail,
                }, {
                    shouldFocus: true
                })

                setError("email", {
                    type: "focus",
                    message: "Check your email again"
                }, {
                    shouldFocus: true
                })

                setError("password", {
                    type: "focus",
                    message: "Enter your password again"
                }, {
                    shouldFocus: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LoginLayout>
            <NavLink to="/signUpStep1" className={`flex justify-center text-sm text-blue-700 underline`}>Create a new account</NavLink>
            <Error>{errors?.emptyToken?.message}</Error>
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(submitHandler)}>
                <input type="hidden" name="remember" defaultValue="true" />
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
                </div>

                {/*May be have to add a <Link> component later on to perform forget password */}
                <a className="text-sm flex justify-end text-blue-700 underline mt-6" href="#noth">Forgot your password?</a>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        </span>
                        Login
                    </button>
                </div>
            </form>
        </LoginLayout >
    )
}

export default LoginPage;