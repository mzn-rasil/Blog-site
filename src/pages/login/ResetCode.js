import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ForgotPasswordLayout from "../../ui/ForgotPasswordLayout";
import * as yup from "yup";
import Error from "../../components/error/Error";

const schema = yup.object().shape({
    resetCode: yup
        .number()
        .required("This cannot be left empty")
        .typeError("Please enter the code")
        .positive("Cannot be a negative number")
        .integer("Must be an integer type")
});

function ResetCode() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            resetCode: undefined
        },
        resolver: yupResolver(schema),
        mode: "onBlur"
    });

    function submitHandler(data) {
        console.log(data);
    }

    return (
        <ForgotPasswordLayout>
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="reset-code"
                    className="form-label inline-block mb-2 text-gray-700">
                    Enter Reset code
                </label>
                <input
                    type="text"
                    id="reset-code"
                    placeholder="Enter your reset code here"
                    autoFocus={true}
                    className="appearance-none w-48 border px-3 py-2 rounded-none
                        relative block placeholder-gray-500 text-gray-900 rounded-t-md
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("resetCode")}
                />
                <Error>{errors?.resetCode?.message}</Error>
                <button
                    type="submit"
                    className="bg-indigo-500 mt-5 w-48 rounded-md p-2 text-white text-semibold"
                >
                    Submit
                </button>
            </form>
        </ForgotPasswordLayout>
    );
}

export default ResetCode;