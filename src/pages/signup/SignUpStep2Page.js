import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignUpLayout from "../../ui/SignUpLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useData } from "../../store/UserContext";
import Error from "../../components/error/Error";

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, "First Name should not contain numbers")
        .required("First name is a required field"),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
        .required("Last name is a required field"),
    phoneNumber: yup
        .string()
        .length(10, "Phone number should contain exactly 10 digits")
        .matches(/^([^a-zA-z]*)$/, "Phone number should only contain numbers")
});

function LoginStep2Page() {
    const { userData, setData } = useData();
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            hasPhoneNumber: false,
            phoneNumber: userData.phoneNumber,
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    function submitHandler(data) {
        setData(data);
        navigate("../signUpStep3");
    }

    const hasPhoneNumber = watch("hasPhoneNumber");

    return (
        <SignUpLayout>
            <form className="mt-8 space-y-6" method="POST" onSubmit={handleSubmit(submitHandler)} >

                <div className="flex justify-center">
                    <div className="mb-1 xl:w-full">
                        <label htmlFor="exampleText0" className="form-label inline-block mb-2 text-gray-700">First Name</label>
                        <input
                            id="exampleText0"
                            type="text"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors?.firstName?.message && 'border-red-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="First Name"
                            {...register("firstName")}
                        />
                        <Error>{errors?.firstName?.message}</Error>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="mb-1 xl:w-full">
                        <label htmlFor="exampleText0" className="form-label inline-block mb-2 text-gray-700">Last Name</label>
                        <input
                            id="exampleText0"
                            type="text"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors?.lastName?.message && 'border-red-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Last Name"
                            {...register("lastName")}
                        />
                        <Error>{errors?.lastName?.message}</Error>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="form-check flex justify-center flex-col xl:w-full">
                        <div className="flex justify-center mb-2">
                            <input
                                className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                {...register("hasPhoneNumber")}
                            />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                                Show Phone Number
                            </label>
                        </div>
                        {hasPhoneNumber && (
                            <div className="flex justify-center">
                                <div className="mb-1 xl:w-full">
                                    <label htmlFor="exampleTel0" className="form-label inline-block mb-2 text-gray-700"
                                    >Phone Number</label
                                    >
                                    <input
                                        id="exampleTel0"
                                        type="tel"
                                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors?.phoneNumber?.message && 'border-red-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                        placeholder="Phone Number"
                                        {...register("phoneNumber")}
                                    />
                                    <Error>{errors?.phoneNumber?.message}</Error>
                                </div>
                            </div>
                        )}
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
    );
}

export default LoginStep2Page;