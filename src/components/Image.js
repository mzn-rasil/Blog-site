

function Image({ src }) {
    return (
        <div>
            <img src={src} width="26" height="26" alt="profileImage"
                className="w-8 h-8 rounded-full border-2 border-indigo-500"
            />
        </div>
    );
}

export default Image;