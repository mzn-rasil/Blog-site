

function Button({ title, className, onClick }) {
    return (
        <button
            className={`bg-indigo-500 text-white rounded-md mb-4 hover:bg-indigo-400 ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

export default Button;