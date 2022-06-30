

function Button({ title, className, onClick }) {
    return (
        <button
            className={`text-indigo-500 border border-indigo-700 rounded-md mb-4 hover:bg-indigo-500 hover:text-white ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

export default Button;