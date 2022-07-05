

function Button({ icon, className, onClick }) {
    return (
        <button
            className={`text-indigo-500 mb-4 hover:bg-indigo-500 hover:rounded-full hover:text-white ${className}`}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}

export default Button;