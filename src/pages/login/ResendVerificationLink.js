import { Link, useNavigate } from "react-router-dom";

function ResendVerificationLink() {
    const navigate = useNavigate();

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Link to="/">
                        <img
                            className="mx-auto h-12 w-auto hover:cursor-pointer"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                    </Link>
                </div>

                <p className="my-2 text-xl">
                    We have sent a reset password link to your email. If not, please
                    <button
                        className="text-indigo-500 underline"
                        onClick={() => { navigate(-1) }}
                    >click here</button>
                </p>
            </div>
        </div>
    );
}

export default ResendVerificationLink;