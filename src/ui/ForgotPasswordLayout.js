import { Link } from "react-router-dom";


function ForgotPasswordLayout({ children }) {
    return (
        <>
            <div className="min-h-full flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto hover:cursor-pointer"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}

export default ForgotPasswordLayout;